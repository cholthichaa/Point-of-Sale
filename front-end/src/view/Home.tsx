'use client'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const zones = ['A', 'B', 'C', 'D', 'E'];

const tablesData = [
  { id: 1, label: 'A01', booked: false },
  { id: 2, label: 'A01', booked: true },
  { id: 3, label: 'A01', booked: true },
  { id: 4, label: 'A01', booked: false },
  { id: 5, label: 'A01', booked: true },
  { id: 6, label: 'A01', booked: false },
  { id: 7, label: 'A01', booked: false },
  { id: 8, label: 'A01', booked: false },
  { id: 9, label: 'A01', booked: false },
  { id: 10, label: 'A01', booked: true },
  { id: 11, label: 'A01', booked: false },
  { id: 12, label: 'A01', booked: false },
  { id: 13, label: 'A01', booked: false },
  { id: 14, label: 'A01', booked: false },
  { id: 15, label: 'A01', booked: true },
];

export default function CashierSystem() {
  const [selectedZone, setSelectedZone] = useState('A');
  const navigate = useNavigate();

  const handleTableClick = (table) => {
    if (table.booked) {
      // ถ้าโต๊ะถูกจองแล้ว (bg เทาเข้ม) ไปหน้า edit order
      navigate('/cashier/manager-bill');
    } else {
      // ถ้าโต๊ะว่าง (bg เทาอ่อน) ไปหน้า manager bill
      navigate('/cashier/edit-order');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-700 pb-2">
        ระบบแคชเชียร์
      </h1>

      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0 mb-6">
        <p className="text-gray-700">กรุณาเลือกโต๊ะก่อนเพิ่มรายการอาหาร</p>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-600 rounded" />
          <span>จองแล้ว</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded" />
          <span>ว่าง</span>
        </div>

        <div className="flex-grow" />

        <div className="flex items-center space-x-2 self-end lg:self-auto">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-gray-600"
          >
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <button className="bg-green-700 text-white px-5 py-1 rounded font-semibold">
            {selectedZone}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {tablesData.map((table) => (
          <button
            key={table.id}
            onClick={() => handleTableClick(table)}
            className={`py-3 rounded font-bold text-center transition-all cursor-pointer ${
              table.booked
                ? 'bg-gray-600 text-white hover:bg-gray-700'
                : 'bg-gray-300 text-black hover:bg-gray-400'
            }`}
          >
            {table.label}
          </button>
        ))}
      </div>
    </div>
  );
}
