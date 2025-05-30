'use client'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function PaymentPage() {
  const [totalAmount] = useState(340.0)
  const [receivedAmount, setReceivedAmount] = useState(0)
  const [status] = useState('รอชำระเงิน') 
  const changeAmount = receivedAmount - totalAmount

  const handleReceivedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    if (!isNaN(val)) {
      setReceivedAmount(val)
    } else {
      setReceivedAmount(0)
    }
  }

const handlePay = () => {
  if (receivedAmount >= totalAmount) {
    Swal.fire({
      icon: 'success',
      title: 'ชำระเงินเรียบร้อย',
      text: 'ขอบคุณครับ!',
      confirmButtonColor: '#22c55e',
    }).then(() => {
      setDate(new Date().toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }))
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'เงินไม่พอ',
      text: 'กรุณารับเงินให้ครบก่อนชำระ',
      confirmButtonColor: '#ef4444',
    })
  }
}


  const handleTransfer = () => {
    Swal.fire({
      icon: 'success',
      title: 'โอนเงินเรียบร้อย',
      confirmButtonColor: '#22c55e',
    })
  }

  const handleEditOrder = () => {
    Swal.fire({
      icon: 'info',
      title: 'แก้ไขออเดอร์',
      confirmButtonColor: '#3b82f6',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans flex justify-center">
      <div className="max-w-7xl w-full flex gap-12">
        {/* ใบแจ้งค่าอาหาร */}
        <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
          <h2 className="text-xl font-bold mb-6 text-center">ใบแจ้งค่าอาหาร</h2>

          <div className="mb-6 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Order ID :</span>
              <span>0001</span>
            </div>
            <div className="flex justify-between">
              <span>หมายเลขโต๊ะ :</span>
              <span>A01</span>
            </div>
            <div className="flex justify-between">
              <span>วันที่ :</span>
              <span>2025-05-21 18:58:48</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2 font-semibold">
              <span>สถานะ :</span>
              <span className={status === 'ชำระเงินแล้ว' ? 'text-green-700 font-semibold' : ''}>{status}</span>
            </div>
          </div>

          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b border-gray-300 font-semibold">
                <th className="pb-2">รายการ</th>
                <th className="pb-2 text-center w-20">จำนวน</th>
                <th className="pb-2 text-right w-28">ราคา</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2">ชานมไข่มุก</td>
                <td className="text-center">1</td>
                <td className="text-right">80.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">ชาไทย</td>
                <td className="text-center">1</td>
                <td className="text-right">80.00</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2">ข้าวผัดหมูกรอบ</td>
                <td className="text-center">2</td>
                <td className="text-right">180.00</td>
              </tr>
              <tr className="border-t border-gray-300 font-semibold">
                <td className="py-3 text-right" colSpan={2}>
                  ราคา
                </td>
                <td className="text-right">340.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ฟอร์มชำระเงิน */}
        <div className="bg-white p-8 rounded-lg shadow-md w-1/3 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <label className="font-semibold">รวมทั้งหมด (บาท)</label>
            <input
              type="text"
              readOnly
              value={totalAmount.toFixed(2)}
              className="border border-gray-300 rounded px-4 py-2 w-32 text-right bg-gray-100"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">รับเงินมา (บาท)</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={receivedAmount}
              onChange={handleReceivedChange}
              className="border border-gray-300 rounded px-4 py-2 w-32 text-right"
            />
          </div>

          <button
            className="bg-white border border-gray-400 py-2 rounded text-gray-700 font-semibold hover:bg-gray-100"
            onClick={handleTransfer}
          >
            โอน
          </button>

          <button
            className="bg-white border border-gray-400 py-2 rounded text-gray-700 font-semibold hover:bg-gray-100"
            onClick={() => {
              if (receivedAmount >= totalAmount)
                Swal.fire({
                  icon: 'success',
                  title: 'จ่ายพอดี',
                  confirmButtonColor: '#22c55e',
                })
              else
                Swal.fire({
                  icon: 'error',
                  title: 'เงินไม่พอ',
                  text: 'กรุณารับเงินให้ครบก่อนชำระ',
                  confirmButtonColor: '#ef4444',
                })
            }}
          >
            จ่ายพอดี
          </button>

          <div className="flex justify-between items-center">
            <label className="font-semibold">ถอน (บาท)</label>
            <input
              type="text"
              readOnly
              value={changeAmount.toFixed(2)}
              className="border border-gray-300 rounded px-4 py-2 w-32 text-right bg-gray-100"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleEditOrder}
              className="bg-gray-400 text-gray-700 py-3 px-8 rounded font-semibold hover:bg-gray-500"
            >
              แก้ไขออเดอร์
            </button>
            <button
              onClick={handlePay}
              className="bg-green-700 text-white py-3 px-8 rounded font-semibold hover:bg-green-800"
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
function setDate(arg0: string) {
    throw new Error('Function not implemented.')
}

