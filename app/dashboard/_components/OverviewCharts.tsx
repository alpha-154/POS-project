"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarController,
  PieController,
} from "chart.js";

import dashboardData from "@/mockData/dashboardData.json";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  BarController,
  PieController,
  Title,
  Tooltip,
  Legend
);

export function OverviewCharts({
  salesPurchases,
  topProducts,
  topSelling,
}: {
  salesPurchases: typeof dashboardData.salesPurchases;
  topProducts: typeof dashboardData.topProducts;
  topSelling: typeof dashboardData.topSelling;
}) {
  const barData = {
    labels: salesPurchases.map((d) => d.month),
    datasets: [
      {
        label: "Sales",
        data: salesPurchases.map((d) => d.sales),
        backgroundColor: "#22c55e",
      },
      {
        label: "Purchases",
        data: salesPurchases.map((d) => d.purchases),
        backgroundColor: "#f97316",
      },
    ],
  };

  const pieData = {
    labels: topProducts.map((p) => p.name),
    datasets: [
      {
        data: topProducts.map((p) => p.percentage),
        backgroundColor: ["#22c55e", "#16a34a", "#15803d"],
        borderColor: ["#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales & Purchases Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={barData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <p className="text-sm text-muted-foreground">Top Customers</p>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Top Customers content */}
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No data is available now!
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products/Services (November)</CardTitle>
            <p className="text-sm text-muted-foreground">
              A list of your top selling 5 Products/Services
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>PRODUCTS / SERVICES</TableHead>
                  <TableHead>QUANTITY</TableHead>
                  <TableHead>TOTAL AMOUNT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSelling.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.quantity}</Badge>
                    </TableCell>
                    <TableCell>€ {product.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Products (November)</CardTitle>
            <p className="text-sm text-muted-foreground">
              You made €27502.00 sales this month with these products
            </p>
          </CardHeader>
          <CardContent>
            <Pie data={pieData} options={pieOptions} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
