'use client'

import { useEffect } from 'react'
import { Line, Bar,Pie } from 'react-chartjs-2'
import { ArcElement } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'
import { FranchiseStats } from './stats'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,   // 👈 BẮT BUỘC cho Pie / Doughnut
)

export default function DashboardPage() {
    const revenueData = {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue (€)',
                data: [95000, 102000, 108000, 115000, 118000, 125000],
                borderWidth: 2,
                tension: 0.4
            }
        ]
    }

    const ordersData = {
        labels: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
        datasets: [
        {
            label: 'Orders',
            data: [45, 38, 32, 25, 16]
        }
        ]
    }

    const orderTypeData = {
        labels: ['Take Away', 'Dine-in'],
        datasets: [
            {
            data: [68, 32],
            backgroundColor: ['#ff7a00', '#14b8a6'],
            borderWidth: 0
            }
        ]
    }


    // ---------- Top Selling Products ----------
    const topProducts = [
        { name: 'Chocolate Dream Cake', units: 145, revenue: '€3,625' },
        { name: 'Vanilla Delight', units: 128, revenue: '€2,816' },
        { name: 'Strawberry Tart', units: 96, revenue: '€1,776' },
        { name: 'Black Forest', units: 78, revenue: '€2,184' }
    ]


    // ---------- Recent Activities ----------
    const activities = [
        { text: 'New order #1256 from Berlin Shop', time: '5 mins ago', type: 'Order' },
        { text: 'Supply order approved for Munich Shop', time: '15 mins ago', type: 'Supply' },
        { text: 'Contract CT-2025-018 signed', time: '1 hour ago', type: 'Contract' },
        { text: 'Low stock alert: Chocolate Sponge', time: '2 hours ago', type: 'Inventory' },
        { text: 'New shop opened in Hamburg', time: '3 hours ago', type: 'Shop' }
    ]

    const lowStocks = [
        { name: 'Chocolate Sponge', shop: 'Berlin Main', value: 5, max: 10 },
        { name: 'Vanilla Cream', shop: 'Munich Central', value: 8, max: 15 },
        { name: 'Fresh Strawberries', shop: 'Frankfurt Shop', value: 12, max: 20 }
    ]

    return (
        <div className="container-fluid p-4" style={{ background: '#f8f9fb', minHeight: '100vh' }}>
            <h2 className="fw-bold">Dashboard</h2>
            <p className="text-muted mb-4">Overview of Germany Cake Franchise System</p>

            <div className="row g-4 mb-4">
                <FranchiseStats />
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                <div className="card p-4 rounded-4 shadow-sm">
                    <h5 className="fw-bold mb-3">Revenue Trend (Last 6 Months)</h5>
                    <Line data={revenueData} />
                </div>
                </div>

                <div className="col-md-6">
                <div className="card p-4 rounded-4 shadow-sm">
                    <h5 className="fw-bold mb-3">Orders by Shop (Today)</h5>
                    <Bar data={ordersData} />
                </div>
                </div>
            </div>

            {/* Order Type + Top Products + Activity */}
            <div className="row g-4 mt-1">
                <div className="col-md-4">
                    <div className="card p-4 rounded-4 shadow-sm">
                        <h5 className="fw-bold mb-3">Order Type Distribution</h5>
                        <Pie data={orderTypeData} />
                        <div className="d-flex justify-content-between mt-3">
                            <span style={{ color: '#ff7a00' }}>Take Away: 68%</span>
                            <span style={{ color: '#14b8a6' }}>Dine-in: 32%</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-4 rounded-4 shadow-sm">
                        <h5 className="fw-bold mb-3">Top Selling Products</h5>
                        {topProducts.map(p => (
                            <div key={p.name} className="d-flex justify-content-between mb-3">
                                <div>
                                    <div className="fw-semibold">{p.name}</div>
                                    <small className="text-muted">{p.units} units sold</small>
                                </div>
                                <div className="fw-bold">{p.revenue}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card p-4 rounded-4 shadow-sm">
                    <h5 className="fw-bold mb-3">Recent Activity</h5>
                    {activities.map((a, i) => (
                        <div key={i} className="mb-3 pb-3 border-bottom">
                            <div className="d-flex justify-content-between">
                                <span className="fw-semibold">{a.text}</span>
                                <span className="badge bg-light text-dark">{a.type}</span>
                            </div>
                            <small className="text-muted">{a.time}</small>
                        </div>
                    ))}
                    </div>
                </div>
            </div>


            {/* Low Stock Alerts */}
<div className="card p-4 rounded-4 shadow-sm mt-4">
<h5 className="fw-bold mb-3">Low Stock Alerts</h5>
<div className="row g-4">
{lowStocks.map(item => (
<div key={item.name} className="col-md-4">
<div className="border餐 rounded-3 p-3" style={{ background: '#fff5f5', borderColor: '#fecaca' }}>
<div className="d-flex justify-content-between align-items-center mb-2">
<div className="fw-semibold">{item.name}</div>
<span className="badge bg-danger-subtle text-danger">Low Stock</span>
</div>
<div className="text-muted mb-2">{item.shop}</div>
<div className="progress" style={{ height: 8 }}>
<div
className="progress-bar bg-danger"
style={{ width: `${(item.value / item.max) * 100}%` }}
/>
</div>
<small className="text-muted">{item.value} / {item.max}</small>
</div>
</div>
))}
</div>
</div>
        </div>
    )
}

