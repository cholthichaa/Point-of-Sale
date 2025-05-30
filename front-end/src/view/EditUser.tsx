import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EditUserForm({ initialData = {}, onSave, onCancel }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  // โหลดข้อมูลตอน component โหลด
  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.first_name || '')
      setLastName(initialData.last_name || '')
      setEmail(initialData.email || '')
      setPhone(initialData.phone || '')
      setUsername(initialData.username || '')
      setStatus(initialData.status || '')
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      username,
      status,
    }
    if (onSave) onSave(updatedUser)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-5">
      <h2 className="text-xl uppercase italic font-semibold text-gray-600 mb-4 border-b border-gray-300 pb-2">
        EDIT USER
      </h2>

      {/* ฟิลด์ต่าง ๆ เหมือนเดิม */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">First Name</label>
        <input
          type="text"
          placeholder="กรอกชื่อจริง"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          placeholder="กรอกนามสกุล"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="กรอกอีเมล"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          placeholder="กรอกเบอร์โทรศัพท์"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Username</label>
        <input
          type="text"
          placeholder="กรอกชื่อผู้ใช้"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
      </div>

     
      <div>
        <label className="block mb-1 font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        >
          <option value="" disabled hidden>กรอกข้อมูลผู้ใช้</option>
          <option value="admin">แอดมิน</option>
          <option value="cashier">แคสเชียร์</option>
        </select>
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 font-semibold"
        >
          บันทึก
        </button>
        <button
          type="button"
          onClick={() => navigate('/admin/manage-user')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 font-semibold"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  )
}
