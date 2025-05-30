import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const stats = [
  { label: 'ยอดขายทั้งหมด', value: '1,000', unit: 'บาท', bg: 'bg-green-600 text-white' },
  { label: 'จำนวนบิล', value: '1,000', unit: 'บิล', bg: 'bg-white text-green-600 border border-green-600' },
  { label: 'จำนวนสินค้า', value: '1,000', unit: 'ชิ้น', bg: 'bg-white text-green-600 border border-green-600' },
  { label: 'จำนวนโต๊ะ', value: '20', unit: 'โต๊ะ', bg: 'bg-white text-green-600 border border-green-600' },
]

const tabs = [
  { id: 'daily', label: 'ยอดขายรายวัน' },
  { id: 'monthly', label: 'ยอดขายรายเดือน' },
  { id: 'yearly', label: 'ยอดขายรายปี' },
]

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Monthly Sales',
      data: [100, 90, 95, 85, 60, 75, 80, 95, 90, 85, 70, 88],
      backgroundColor: 'rgba(22, 163, 74, 0.8)', // Tailwind green-700 with opacity
      borderRadius: 6,
      barPercentage: 0.6,
    },
  ],
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('daily')

  return (
    <div className="p-8 bg-white rounded-xl shadow-xl max-w-7xl mx-auto">
      {/* Summary Cards */}
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-6 justify-start mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-300 flex flex-col justify-between p-6 rounded-2xl shadow-md flex-1 min-w-[220px] cursor-pointer transform transition duration-300 hover:scale-105"
            style={{ maxWidth: '23%' }}
          >
            <div className="text-sm font-semibold tracking-wide">{stat.label}</div>
            <div className="text-4xl font-extrabold my-3 flex items-baseline">
              <span>{stat.value}</span>
              <span className="ml-2 text-lg font-medium">{stat.unit}</span>
            </div>
            <div className="text-green-600 text-xs underline cursor-pointer hover:text-green-400">
              รายละเอียด
            </div>
          </div>
        ))}
      </div>


      {/* Tabs */}
      <div className="flex gap-4 mb-10 justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-full font-semibold text-lg transition-colors duration-300
        ${activeTab === tab.id
                ? 'bg-green-700 text-white shadow-lg shadow-green-300/50'
                : 'bg-green-100 text-green-700 hover:bg-green-300'
              }
      `}
          >
            {tab.label}
          </button>
        ))}
      </div>


      {/* Chart */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
        {activeTab === 'monthly' ? (
          <>
            <h2 className="text-2xl font-bold text-green-800 mb-6 select-none">Monthly Sales</h2>
            <Bar
              data={monthlyData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: '#14532d',
                    titleColor: 'white',
                    bodyColor: 'white',
                    cornerRadius: 6,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 20,
                      color: '#14532d',
                      font: { weight: '600' },
                    },
                    grid: {
                      color: '#d1fae5',
                    },
                  },
                  x: {
                    ticks: {
                      color: '#14532d',
                      font: { weight: '600' },
                    },
                    grid: {
                      display: false,
                    },
                  },
                },
                animation: {
                  duration: 1000,
                  easing: 'easeOutQuart',
                },
              }}
            />
          </>
        ) : (
          <div className="text-center text-green-600 text-xl font-medium py-20 select-none">
            กำลังพัฒนาข้อมูล {tabs.find(t => t.id === activeTab)?.label}
          </div>
        )}
      </div>
    </div>
  )
}
