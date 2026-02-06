'use client';

import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Database,
  PieChart,
  Store,
  Building2
} from 'lucide-react';
import { StatCard } from '@/components/stat/statCard';

export const dashboardStats = {
    revenue: 12500,
    profit: 8200,
    expenses: 4300,
    store: 125,
    orders: 98,
    customers: 74,
    products: 32,
    franchise: 2,
 
};

export function DashboardStats() {
    return (
        <div className="row g-3 mb-4">
        {/* Row 1 */}
        <div className="col-md-3">
            <StatCard
            title="Revenue"
            value={`$${dashboardStats.revenue.toLocaleString()}`}
            icon={<DollarSign size={20} />}
            iconBg="#e83e8c"
            />
        </div>

        <div className="col-md-3">
            <StatCard
            title="Profit"
            value={`$${dashboardStats.profit.toLocaleString()}`}
            icon={<TrendingUp size={20} />}
            iconBg="#28a745"
            />
        </div>

        <div className="col-md-3">
            <StatCard
            title="Expenses"
            value={`$${dashboardStats.expenses.toLocaleString()}`}
            icon={<TrendingDown size={20} />}
            iconBg="#dc3545"
            />
        </div>

        <div className="col-md-3">
            <StatCard
            title="Store"
            value={`${dashboardStats.store}`}
            icon={<Store size={20} />}
            iconBg="#4c6ef5"
            />
        </div>

        {/* Row 2 */}
        <div className="col-md-3">
            <StatCard
            title="Orders"
            value={dashboardStats.orders}
            icon={<ShoppingCart size={20} />}
            iconBg="#fd7e14"
            />
        </div>

        <div className="col-md-3">
            <StatCard
            title="Customers"
            value={dashboardStats.customers}
            icon={<Users size={20} />}
            iconBg="#82c91e"
            />
        </div>

        <div className="col-md-3">
            <StatCard
            title="Products"
            value={dashboardStats.products}
            icon={<Database size={20} />}
            iconBg="#339af0"
            />
        </div>

        <div className="col-md-3">
            <StatCard
            title="Franchise"
            value={`${dashboardStats.franchise}`}
            icon={<Building2 size={20} />}
            iconBg="#fd7e14"
            />
        </div>

        
        </div>
    );
}