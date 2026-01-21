'use client';

import { StatCard } from '@/components/stat/statCard';
import {
  faUsers,
  faFileContract,
  faStore,
  faBoxOpen,
  faCartShopping,
  faArrowTrendUp
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const dashboardStats = {
    revenue: 12500,
    profit: 8200,
    expenses: 4300,
    averageOrderValue: 125,
    orders: 98,
    customers: 74,
    products: 32,
    conversionRate: 2.3,
 
};

export function FranchiseStats() {
  return (
    <div className="row g-3 mb-4">
      {/* Row 1 */}
        <div className="col-md-4">
            <StatCard
                title="Active Franchisees"
                value={`$${dashboardStats.revenue.toLocaleString()}`}
                icon={<FontAwesomeIcon icon={faUsers} /> }
                iconBg="#e83e8c"
            />
        </div>

        <div className="col-md-4">
            <StatCard 
                title="Active Contracts"
                value={`$${dashboardStats.profit.toLocaleString()}`}
                icon={<FontAwesomeIcon icon={faFileContract} />}
                iconBg="#28a745"
            />
        </div>

        <div className="col-md-4">
            <StatCard
                title="Total shops"
                value={`$${dashboardStats.expenses.toLocaleString()}`}
                icon={<FontAwesomeIcon icon={faStore} />}
                iconBg="#dc3545"
            />
        </div>

        <div className="col-md-4">
            <StatCard
                title="Pending Supplu Orders"
                value={`$${dashboardStats.averageOrderValue}`}
                icon={<FontAwesomeIcon icon={faBoxOpen} />}
                iconBg="#4c6ef5"
            />
        </div>

      {/* Row 2 */}
        <div className="col-md-4">
            <StatCard
                title="Today's Orders"
                value={dashboardStats.orders}
                icon={<FontAwesomeIcon icon={faCartShopping} />}
                iconBg="#fd7e14"
            />
        </div>

        <div className="col-md-4">
            <StatCard
                title="Monthly Revenue"
                value={dashboardStats.customers}
                icon={<FontAwesomeIcon icon={faArrowTrendUp} />}
                iconBg="#82c91e"
            />
        </div>
    </div>
  );
}