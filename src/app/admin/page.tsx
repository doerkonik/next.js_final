'use client'

import Loader from '@/components/Loading'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Domain {
  id: string
  extension: string
  price: string
  description: string
  popular: boolean
  createdAt: string
  updatedAt: string
}

interface HostingPlan {
  id: string
  name: string
  price: string
  href?: string
  features: string[]
  popular: boolean
  createdAt: string
  updatedAt: string
}

interface VPSPlan {
  id: string
  name: string
  price: string
  href?: string
  cpu: string
  ram: string
  storage: string
  bandwidth: string
  port?: string
  popular: boolean
  createdAt: string
  updatedAt: string
}

interface ModalState {
  isOpen: boolean
  mode: 'create' | 'edit'
  item?: any
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('domains')

  useEffect(() => {
    if (status === 'loading') return
    if (!session || !session.user || session.user.role !== 'admin') {
      router.push('/signin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return <Loader />
  }

  if (!session || !session.user || session.user.role !== 'admin') {
    return null
  }

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your hosting platform content</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {[
            { id: 'domains', label: 'Domains', icon: '🌐' },
            { id: 'hosting', label: 'Hosting Plans', icon: '☁️' },
            { id: 'vps', label: 'VPS Plans', icon: '🖥️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="glass-card rounded-2xl p-6">
          {activeTab === 'domains' && <DomainManager />}
          {activeTab === 'hosting' && <HostingManager />}
          {activeTab === 'vps' && <VPSManager />}
        </div>
      </div>
    </div>
  )
}

function DomainManager() {
  const [domains, setDomains] = useState<Domain[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState>({ isOpen: false, mode: 'create' })
  const [formData, setFormData] = useState({
    extension: '',
    price: '',
    description: '',
    popular: false,
  })

  useEffect(() => {
    fetchDomains()
  }, [])

  const fetchDomains = async () => {
    try {
      const response = await fetch('/api/domains')
      const data = await response.json()
      setDomains(data)
    } catch (error) {
      console.error('Failed to fetch domains:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({ extension: '', price: '', description: '', popular: false })
    setModal({ isOpen: true, mode: 'create' })
  }

  const handleEdit = (domain: Domain) => {
    setFormData({
      extension: domain.extension,
      price: domain.price,
      description: domain.description,
      popular: domain.popular,
    })
    setModal({ isOpen: true, mode: 'edit', item: domain })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this domain?')) return

    try {
      const response = await fetch(`/api/domains/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setDomains(domains.filter((d) => d.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete domain:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = modal.mode === 'create' ? '/api/domains' : `/api/domains/${modal.item?.id}`
      const method = modal.mode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setModal({ isOpen: false, mode: 'create' })
        fetchDomains()
      }
    } catch (error) {
      console.error('Failed to save domain:', error)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Domain Management</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add Domain
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left p-4">Extension</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Popular</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((domain) => (
              <tr key={domain.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 font-mono">{domain.extension}</td>
                <td className="p-4">৳{domain.price}</td>
                <td className="p-4">{domain.description}</td>
                <td className="p-4">
                  {domain.popular ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Yes</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">No</span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit(domain)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(domain.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modal.mode === 'create' ? 'Add Domain' : 'Edit Domain'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Extension</label>
                  <input
                    type="text"
                    value={formData.extension}
                    onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="mr-2"
                    />
                    Popular
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setModal({ isOpen: false, mode: 'create' })}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
                >
                  {modal.mode === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function HostingManager() {
  const [plans, setPlans] = useState<HostingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState>({ isOpen: false, mode: 'create' })
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    href: '',
    features: '',
    popular: false,
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/hosting')
      const data = await response.json()
      setPlans(data)
    } catch (error) {
      console.error('Failed to fetch hosting plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({ name: '', price: '', href: '', features: '', popular: false })
    setModal({ isOpen: true, mode: 'create' })
  }

  const handleEdit = (plan: HostingPlan) => {
    setFormData({
      name: plan.name,
      price: plan.price,
      href: plan.href || '',
      features: plan.features.join(', '),
      popular: plan.popular,
    })
    setModal({ isOpen: true, mode: 'edit', item: plan })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hosting plan?')) return

    try {
      const response = await fetch(`/api/hosting/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setPlans(plans.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete hosting plan:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = modal.mode === 'create' ? '/api/hosting' : `/api/hosting/${modal.item?.id}`
      const method = modal.mode === 'create' ? 'POST' : 'PUT'

      const data = {
        ...formData,
        features: formData.features.split(',').map((f) => f.trim()),
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setModal({ isOpen: false, mode: 'create' })
        fetchPlans()
      }
    } catch (error) {
      console.error('Failed to save hosting plan:', error)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Hosting Plan Management</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add Plan
        </button>
      </div>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <p className="text-2xl font-bold text-primary">৳{plan.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Features: {plan.features.join(', ')}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modal.mode === 'create' ? 'Add Hosting Plan' : 'Edit Hosting Plan'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Features (comma-separated)</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    rows={3}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Link (optional)</label>
                  <input
                    type="text"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="mr-2"
                    />
                    Popular
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setModal({ isOpen: false, mode: 'create' })}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
                >
                  {modal.mode === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function VPSManager() {
  const [plans, setPlans] = useState<VPSPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<ModalState>({ isOpen: false, mode: 'create' })
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    href: '',
    cpu: '',
    ram: '',
    storage: '',
    bandwidth: '',
    port: '',
    popular: false,
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/vps')
      const data = await response.json()
      setPlans(data)
    } catch (error) {
      console.error('Failed to fetch VPS plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setFormData({ name: '', price: '', href: '', cpu: '', ram: '', storage: '', bandwidth: '', port: '', popular: false })
    setModal({ isOpen: true, mode: 'create' })
  }

  const handleEdit = (plan: VPSPlan) => {
    setFormData({
      name: plan.name,
      price: plan.price,
      href: plan.href || '',
      cpu: plan.cpu,
      ram: plan.ram,
      storage: plan.storage,
      bandwidth: plan.bandwidth,
      port: plan.port || '',
      popular: plan.popular,
    })
    setModal({ isOpen: true, mode: 'edit', item: plan })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this VPS plan?')) return

    try {
      const response = await fetch(`/api/vps/${id}`, { method: 'DELETE' })
      if (response.ok) {
        setPlans(plans.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete VPS plan:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = modal.mode === 'create' ? '/api/vps' : `/api/vps/${modal.item?.id}`
      const method = modal.mode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setModal({ isOpen: false, mode: 'create' })
        fetchPlans()
      }
    } catch (error) {
      console.error('Failed to save VPS plan:', error)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">VPS Plan Management</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Add Plan
        </button>
      </div>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <p className="text-2xl font-bold text-primary">৳{plan.price}/mo</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div><strong>CPU:</strong> {plan.cpu}</div>
              <div><strong>RAM:</strong> {plan.ram}</div>
              <div><strong>Storage:</strong> {plan.storage}</div>
              <div><strong>Bandwidth:</strong> {plan.bandwidth}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {modal.mode === 'create' ? 'Add VPS Plan' : 'Edit VPS Plan'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CPU</label>
                  <input
                    type="text"
                    value={formData.cpu}
                    onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    placeholder="e.g., 2 vCPU"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">RAM</label>
                  <input
                    type="text"
                    value={formData.ram}
                    onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    placeholder="e.g., 4GB"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Storage</label>
                  <input
                    type="text"
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    placeholder="e.g., 50GB SSD"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Bandwidth</label>
                  <input
                    type="text"
                    value={formData.bandwidth}
                    onChange={(e) => setFormData({ ...formData, bandwidth: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    placeholder="e.g., 1TB"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Link (optional)</label>
                  <input
                    type="text"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    placeholder="e.g., /order/vps-starter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Port (optional)</label>
                  <input
                    type="text"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    className="w-full p-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
                    placeholder="e.g., 22"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.popular}
                      onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                      className="mr-2"
                    />
                    Popular
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setModal({ isOpen: false, mode: 'create' })}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600"
                >
                  {modal.mode === 'create' ? 'Create' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}