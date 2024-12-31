
import { StatsCards } from './_components/StatsCard'
import { OverviewCharts } from './_components/OverviewCharts'
import { RecentSales } from './_components/RecentSales'
import { StockAlerts } from './_components/StockAlerts'
import dashboardData from "@/mockData/dashboardData.json";

export const metadata = {
  title: 'Dashboard - BPOS',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <StatsCards data={dashboardData.stats} />
      <OverviewCharts 
        salesPurchases={dashboardData.salesPurchases}
        topProducts={dashboardData.topProducts}
        topSelling={dashboardData.topSelling}
      />
      <RecentSales />
      <StockAlerts data={dashboardData.stockAlerts} />
    </div>
  )
}




