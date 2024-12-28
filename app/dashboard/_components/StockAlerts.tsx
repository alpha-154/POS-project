import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Badge } from "@/components/ui/badge"
import dashboardData from "@/mockData/dashboardData.json";
  export function StockAlerts({ data }: { data: typeof dashboardData.stockAlerts }) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stock Alerts</CardTitle>
          <Button>Show All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CODE</TableHead>
                <TableHead>PRODUCT</TableHead>
                <TableHead>SIZE</TableHead>
                <TableHead>COLOR</TableHead>
                <TableHead>WAREHOUSE</TableHead>
                <TableHead>QUANTITY</TableHead>
                <TableHead>ALERT QUANTITY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.warehouse}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.quantity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="destructive">{item.alertQuantity}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  
  