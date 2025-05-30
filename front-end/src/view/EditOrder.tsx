'use client'
import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

type FoodItem = {
  id: number
  name: string
  category: string
  price: number
  image: string
}

type OrderItem = {
  id: number
  name: string
  qty: number
  price: number
}

const foodList: FoodItem[] = [
  { id: 1, name: 'ข้าวผัดไข่', category: 'อาหารตามสั่ง', price: 90, image: 'https://www.thaiholidayguide.com/wp-content/uploads/2022/12/cok2-1.jpg' },
  { id: 2, name: 'ส้มตำ', category: 'อาหารอีสาน', price: 70, image: 'https://www.thaiholidayguide.com/wp-content/uploads/2022/12/cok2-1.jpg' },
  { id: 3, name: 'ผัดไทย', category: 'อาหารจานเดียว', price: 80, image: 'https://www.thaiholidayguide.com/wp-content/uploads/2022/12/cok2-1.jpg' },
  { id: 4, name: 'ต้มยำกุ้ง', category: 'อาหารจานเดียว', price: 120, image: 'https://www.thaiholidayguide.com/wp-content/uploads/2022/12/cok2-1.jpg' },
  { id: 5, name: 'ลาบหมู', category: 'อาหารอีสาน', price: 75, image: 'https://www.thaiholidayguide.com/wp-content/uploads/2022/12/cok2-1.jpg' },
]

export default function FoodOrder() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')
  const tableNumber = 'A02'

  const categories = ['ทั้งหมด', ...Array.from(new Set(foodList.map(food => food.category)))]

  const filteredFoodList = selectedCategory === 'ทั้งหมด'
    ? foodList
    : foodList.filter(food => food.category === selectedCategory)

  function addItem(food: FoodItem) {
    setOrderItems(prev => {
      const existing = prev.find(item => item.id === food.id)
      if (existing) {
        return prev.map(item =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { id: food.id, name: food.name, qty: 1, price: food.price }]
    })
  }

  function updateQty(id: number, qty: number) {
    if (qty < 1) return
    setOrderItems(prev =>
      prev.map(item => (item.id === id ? { ...item, qty } : item))
    )
  }

  function removeItem(id: number) {
    setOrderItems(prev => prev.filter(item => item.id !== id))
  }

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="max-w-7xl mx-auto p-8 flex gap-12">
      {/* รายการอาหาร */}
      <div className="flex-1">
        <h2 className="bg-green-800 text-white text-center py-3 rounded-full text-xl font-bold mb-6">
          รายการอาหาร
        </h2>

        {/* Dropdown เลือกหมวดหมู่ */}
        <div className="mb-4">
          <select
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* เมนูอาหารตามหมวดหมู่ที่เลือก */}
        <div className="grid grid-cols-2 gap-6">
          {filteredFoodList.map(food => (
            <div
              key={food.id}
              className="flex border rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition p-2"
              onClick={() => addItem(food)}
            >
              <img src={food.image} alt={food.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="ml-4 flex flex-col justify-between flex-grow">
                <div>
                  <div className="font-semibold text-lg">{food.name}</div>
                  <div className="text-sm text-gray-500">{food.category}</div>
                </div>
                <div className="font-bold">{food.price.toFixed(2)} บาท</div>
                <button
                  className="mt-2 border rounded px-3 py-1 text-green-700 font-semibold hover:bg-green-50 w-max"
                  onClick={e => {
                    e.stopPropagation()
                    addItem(food)
                  }}
                  type="button"
                >
                  สั่งอาหาร
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ตารางรายการอาหาร */}
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-4">รายการอาหาร โต๊ะ: {tableNumber}</h3>

        <table className="w-full border-collapse border border-green-800 text-left">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="px-4 py-2 w-12">NO.</th>
              <th className="px-4 py-2">รายการอาหาร</th>
              <th className="px-4 py-2 w-28">จำนวน</th>
              <th className="px-4 py-2 w-28">ราคา</th>
              <th className="px-4 py-2 w-12">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  ยังไม่มีรายการอาหาร
                </td>
              </tr>
            ) : (
              orderItems.map((item, i) => (
                <tr key={item.id} className="border-b border-green-800">
                  <td className="px-4 py-2">{String(i + 1).padStart(2, '0')}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min={1}
                      className="w-full text-center border border-green-800 rounded"
                      value={item.qty}
                      onChange={e => updateQty(item.id, parseInt(e.target.value) || 1)}
                    />
                  </td>
                  <td className="px-4 py-2">{(item.price * item.qty).toFixed(2)}</td>
                  <td
                    className="px-4 py-2 text-center cursor-pointer text-red-600 hover:text-red-800"
                    onClick={() => removeItem(item.id)}
                  >
                    <TrashIcon className="w-6 h-6 inline" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="font-bold text-green-900">
              <td colSpan={3} className="text-right px-4 py-2">รวมทั้งหมด</td>
              <td className="px-4 py-2">{totalPrice.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        <div className="flex gap-6 mt-6">
          <button
            className={`bg-green-800 text-white rounded px-6 py-2 font-bold hover:bg-green-900 transition disabled:opacity-60 disabled:cursor-not-allowed`}
            disabled={orderItems.length === 0}
            type="button"
            onClick={() => alert('บันทึกเรียบร้อย')}
          >
            บันทึก
          </button>
          <button
            className="bg-gray-400 text-gray-700 rounded px-6 py-2 font-bold hover:bg-gray-500 transition"
            type="button"
            onClick={() => setOrderItems([])}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  )
}
