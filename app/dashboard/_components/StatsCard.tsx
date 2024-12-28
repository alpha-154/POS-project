import {  RotateCcw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import dashboardData from "@/mockData/dashboardData.json";
interface StatCardProps {
  title: string
  amount: number
  change: number
  period: string
  icon: "sales" | "purchase" | "return"
}

const icons = {
  sales: RotateCcw,
  purchase: RotateCcw,
  return: RotateCcw
}

export function StatCard({ title, amount, change, period, icon }: StatCardProps) {
  const Icon = icons[icon]
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold">€ {amount.toFixed(2)}</p>
            <p className={`text-sm ${change < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {change.toFixed(2)}% {period}
            </p>
          </div>
          <Icon className="h-5 w-5 text-lime-500" />
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsCards({ data }: { data: typeof dashboardData.stats }) {
  return (
    <div className="space-y-4">
      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.today.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            amount={stat.amount}
            change={stat.change}
            period={stat.period}
            icon={stat.icon as "sales" | "purchase" | "return"}
          />
        ))}
      </div>
      
      {/* Total Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.total.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            amount={stat.amount}
            change={stat.change}
            period={stat.period}
            icon={stat.icon as "sales" | "purchase" | "return"}
          />
        ))}
      </div>
    </div>
  )
}


