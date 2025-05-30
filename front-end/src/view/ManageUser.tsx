'use client'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  KeyIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import Swal from 'sweetalert2'  // นำเข้า Swal

const initialUsers = [
  {
    id: 1,
    username: 'คริส',
    status: 'แอดมิน',
    email: 'chris@example.com',
    createdAt: '2023-05-01',
    firstName: 'Chris',
    lastName: 'Smith',
    phone: '0801234567',
  },
  // ...เพิ่มข้อมูล user ตามต้องการ
]

export default function UserTable() {
  const [users, setUsers] = useState(initialUsers)  // เก็บ users ใน state
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  const navigate = useNavigate()

  // กรองตาม search
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // แบ่งหน้า
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // ฟังก์ชันลบ user โดย id
  const handleDelete = (id) => {
    Swal.fire({
      title: 'ต้องการลบผู้ใช้นี้หรือไม่?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',  // สีเขียว
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ลบเลย',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(user => user.id !== id))
        Swal.fire('ลบเรียบร้อย!', '', 'success')
      }
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2 border-b border-gray-400 pb-2">Manage User</h1>

      {/* ปุ่ม Add User */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/admin/add-user')}
          className="bg-green-800 hover:bg-green-900 text-white font-semibold px-5 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* Search + แสดงจำนวน */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center border border-green-600 rounded-md px-3 py-1 w-64">
          <MagnifyingGlassIcon className="w-5 h-5 text-green-600" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            className="ml-2 outline-none w-full text-sm"
          />
        </div>
        <div className="bg-white border rounded-md px-3 py-1 text-sm shadow">
          Showing: {filteredUsers.length} items
        </div>
      </div>

      {/* ตาราง */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">ลำดับ</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">ชื่อผู้ใช้</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">สถานะ</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">อีเมล</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">ชื่อจริง</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">นามสกุล</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">เบอร์โทร</th>
              <th className="p-3 text-left text-sm font-semibold text-gray-700">วันที่สร้าง</th>
              <th className="p-3 text-center text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  ไม่พบข้อมูลผู้ใช้
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user, idx) => (
                <tr key={user.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 text-sm text-gray-700">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="p-3 text-sm text-gray-700">{user.username}</td>
                  <td className="p-3 text-sm text-gray-700">{user.status}</td>
                  <td className="p-3 text-sm text-gray-700">{user.email}</td>
                  <td className="p-3 text-sm text-gray-700">{user.firstName || '-'}</td>
                  <td className="p-3 text-sm text-gray-700">{user.lastName || '-'}</td>
                  <td className="p-3 text-sm text-gray-700">{user.phone || '-'}</td>
                  <td className="p-3 text-sm text-gray-700">{user.createdAt}</td>
                  <td className="p-3 text-center flex justify-center space-x-4">
                    <button onClick={() => navigate('/admin/change-password')} title="เปลี่ยนรหัสผ่าน" className="text-black hover:text-green-900">
                      <KeyIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => navigate('/admin/edit-user')} title="แก้ไข" className="text-gray-600 hover:text-gray-900">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      title="ลบ"
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-end items-center bg-gray-100 rounded p-4 space-x-1">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 bg-white'
            }`}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((pageNum) => (
          <button
            key={pageNum + 1}
            onClick={() => setCurrentPage(pageNum + 1)}
            className={`px-4 py-1 rounded-md border ${currentPage === pageNum + 1 ? 'bg-green-800 text-white border-green-800' : 'bg-white hover:bg-gray-200'
              }`}
          >
            {pageNum + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'hover:bg-gray-200 bg-white'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
