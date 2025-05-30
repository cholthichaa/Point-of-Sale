'use client'
import React, { useState, useMemo } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    id: 1,
    status: 'ชำระเงินแล้ว',
    datetime: '2026-05-22 14:36:56',
    cashier: 'คริส',
    totalPrice: 1425.0,
    paymentStatus: 'ชำระเงินแล้ว',
    table: 'A01',
  },
  {
    id: 2,
    status: 'รอชำระเงิน',
    datetime: '2026-05-22 14:36:56',
    cashier: 'คริส',
    totalPrice: 1425.0,
    paymentStatus: 'รอการชำระเงิน',
    table: 'B02',
  },
  {
    id: 3,
    status: 'ชำระเงินแล้ว',
    datetime: '2026-05-21 10:20:30',
    cashier: 'ส้ม',
    totalPrice: 3000.0,
    paymentStatus: 'ชำระเงินแล้ว',
    table: 'C03',
  },
  {
    id: 4,
    status: 'รอชำระเงิน',
    datetime: '2026-05-20 09:10:00',
    cashier: 'โบว์',
    totalPrice: 500.0,
    paymentStatus: 'รอการชำระเงิน',
    table: 'A02',
  },
  {
    id: 5,
    status: 'ชำระเงินแล้ว',
    datetime: '2026-05-19 08:00:00',
    cashier: 'คริส',
    totalPrice: 1200.0,
    paymentStatus: 'ชำระเงินแล้ว',
    table: 'B01',
  },
]

const ITEMS_PER_PAGE = 3

export default function ManageBillCashier() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    const term = searchTerm.toLowerCase()
    return data.filter(item =>
      item.id.toString().includes(term) ||
      item.status.toLowerCase().includes(term) ||
      item.datetime.toLowerCase().includes(term) ||
      item.cashier.toLowerCase().includes(term) ||
      item.totalPrice.toString().includes(term) ||
      item.table.toLowerCase().includes(term) ||
      (item.paymentStatus.toLowerCase().includes(term) ||
        (item.paymentStatus === 'ชำระเงินแล้ว' && 'ชำระเงิน'.includes(term)) ||
        (item.paymentStatus !== 'ชำระเงินแล้ว' && 'รอชำระเงิน'.includes(term)))
    )
  }, [searchTerm])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredData, currentPage])

  const totalPriceAll = useMemo(() => {
    return data.reduce((sum, item) => sum + item.totalPrice, 0)
  }, [])

  function goToPage(page) {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  function handleBillClick(item) {
    if (item.paymentStatus === 'ชำระเงินแล้ว') {
      navigate('/cashier/bill')
    } else {
      navigate('/cashier/manager-bill')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-700 pb-2">
          ระบบแคชเชียร์
        </h1>

        <div className="flex flex-col sm:flex-row justify-end items-center mb-6 sm:mb-8 gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search..."
              className="pl-12 pr-6 py-3 rounded-lg border-2 border-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 focus:border-transparent text-gray-700 text-base w-full"
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
            <MagnifyingGlassIcon className="w-6 h-6 text-green-600 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
          <div className="text-base text-gray-700 bg-white px-5 py-2 rounded-lg border border-gray-300 whitespace-nowrap">
            Showing: {filteredData.length} items
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-[800px] w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-4 px-6 text-base font-semibold text-gray-700 border-b-4 border-gray-300 min-w-[40px]">ลำดับ</th>
                <th className="py-4 px-6 text-base font-semibold text-gray-700 border-b-4 border-gray-300 min-w-[90px]">โต๊ะ</th>
                <th className="py-4 px-6 text-base font-semibold text-gray-700 border-b-4 border-gray-300 min-w-[80px]">สถานะ</th>
                <th className="py-4 px-6 text-base font-semibold text-gray-700 border-b-4 border-gray-300 min-w-[150px] hidden sm:table-cell">วันที่ทำรายการ</th>
                <th className="py-4 px-6 text-base font-semibold text-gray-700 border-b-4 border-gray-300 min-w-[100px] hidden md:table-cell">แคชเชียร์</th>
                <th className="py-4 px-6 text-base font-semibold text-gray-700 border-b-4 border-gray-300 min-w-[100px]">ราคารวม</th>
                <th className="py-4 px-6 text-base font-semibold text-gray-700 border-b-4 border-gray-300 min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-400 text-lg">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              ) : (
                currentData.map((item, i) => (
                  <tr key={item.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="py-4 px-6 text-base text-gray-700 border-b border-gray-300">{item.id}</td>
                    <td className="py-4 px-6 text-base text-gray-700 border-b border-gray-300">{item.table}</td>
                    <td className="py-4 px-6 text-base text-gray-700 border-b border-gray-300 min-w-[80px]">
                      {item.paymentStatus === 'ชำระเงินแล้ว' ? 'ชำระเงิน' : 'รอชำระเงิน'}
                    </td>
                    <td className="py-4 px-6 text-base text-gray-700 border-b border-gray-300 hidden sm:table-cell">
                      {item.datetime}
                    </td>
                    <td className="py-4 px-6 text-base text-gray-700 border-b border-gray-300 hidden md:table-cell">
                      {item.cashier}
                    </td>
                    <td className="py-4 px-6 text-base text-gray-700 border-b border-gray-300">{item.totalPrice.toFixed(2)}</td>
                    <td className="py-4 px-6 text-base border-b border-gray-300">
                      <button
                        onClick={() => handleBillClick(item)}
                        className="bg-green-800 text-white text-base font-semibold px-6 py-2 rounded-md hover:bg-green-900 transition whitespace-nowrap"
                      >
                        บิล
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 px-6 py-4 rounded-b-lg mt-6 text-gray-700 text-base select-none gap-4 sm:gap-0">

          <div className="flex flex-col sm:flex-row items-center gap-3 whitespace-nowrap">
            <span className="bg-gray-300 rounded-full px-4 py-2">รวมยอดขายทั้งหมด</span>
            <span className="bg-gray-300 rounded-full px-5 py-2">
              {totalPriceAll.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-4 py-2 rounded-md border ${currentPage === page
                    ? 'bg-green-800 text-white border-green-800'
                    : 'bg-white border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
