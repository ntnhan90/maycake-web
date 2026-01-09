'use client';

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export const salesReportData = [
  { date: '11 Dec', completed: 120, pending: 30 },
  { date: '13 Dec', completed: 220, pending: 50 },
  { date: '15 Dec', completed: 180, pending: 20 },
  { date: '17 Dec', completed: 260, pending: 70 },
  { date: '19 Dec', completed: 300, pending: 40 },
  { date: '21 Dec', completed: 420, pending: 90 },
  { date: '23 Dec', completed: 380, pending: 60 },
  { date: '25 Dec', completed: 510, pending: 120 },
  { date: '27 Dec', completed: 470, pending: 80 },
  { date: '29 Dec', completed: 620, pending: 150 },
  { date: '31 Dec', completed: 720, pending: 100 },
  { date: '02 Jan', completed: 680, pending: 90 },
  { date: '04 Jan', completed: 820, pending: 160 },
  { date: '06 Jan', completed: 900, pending: 140 },
  { date: '08 Jan', completed: 1050, pending: 200 },
];

export function SalesReportsChart() {
  const totalCompleted = salesReportData.reduce((s, i) => s + i.completed, 0);
  const totalPending = salesReportData.reduce((s, i) => s + i.pending, 0);

  const data = {
    labels: salesReportData.map(i => i.date),
    datasets: [
      {
        label: 'Completed',
        data: salesReportData.map(i => i.completed),
        borderColor: '#28a745',
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: 'Pending',
        data: salesReportData.map(i => i.pending),
        borderColor: '#dc3545',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Sales Reports</h5>
      </div>

      <div className="card-body d-flex">
        {/* Chart */}
        <div style={{ width: '75%', height: 320 }}>
          <Line data={data} options={options} />
        </div>

        {/* Summary bên phải */}
        <div className="ms-4">
          <h6 className="text-muted">Total Earnings</h6>
          <h4>${totalCompleted.toLocaleString()}</h4>

          <div className="mt-3 d-flex align-items-center gap-2">
            <span className="badge bg-success rounded-circle p-2"></span>
            <span>${totalCompleted.toLocaleString()} Completed</span>
          </div>

          <div className="mt-2 d-flex align-items-center gap-2">
            <span className="badge bg-danger rounded-circle p-2"></span>
            <span>${totalPending.toLocaleString()} Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
}
