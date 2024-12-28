"use client";
import { useEffect, useState } from "react";
import {
  getAllPayments,
  deletePayment,
  deleteDatabase,
} from "@/utils/recentSalesIndexedDB";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RecentSaleProducts } from "@/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
export function RecentSales() {
  const [data, setData] = useState<RecentSaleProducts[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const payments = await getAllPayments();
        setData(payments);
        console.log("recent sale data: ", payments);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while fetching the Data!");
      }
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await deletePayment(id);
      console.log("deleted data: ", response);
      setData((prevData) => prevData.filter((payment) => payment.id !== id));
      toast.success("Sale Data deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the Data!");
    }
  };

  const handleDeleteAllSellData = async () => {
    try {
      const response = await deleteDatabase();
      console.log("deleted data: ", response);
      setData([]);
      toast.success("All Sale Data deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the Data!");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            A list of your recent sales.
          </p>
          { data?.length > 0 && (
               <Button
               onClick={handleDeleteAllSellData}
               variant="ghost"
               className="text-red-600 border border-red-600 p-2 rounded-md hover:bg-red-600/10 transition-colors duration-100 hover:text-red-500"
             >
               Delete all sales data
             </Button>
          )}
         
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>REFERENCE NO</TableHead>
              <TableHead>CUSTOMER</TableHead>
              <TableHead>WAREHOUSE</TableHead>
              <TableHead>TOTAL AMOUNT</TableHead>
              <TableHead>DUE</TableHead>
              <TableHead>METHOD</TableHead>
              <TableHead>PAYMENT STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell>
                  <p className="text-sm text-muted-foreground">No sales yet.</p>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.map((sale, i) => (
                  <TableRow key={i}>
                    <TableCell>{sale.reference}</TableCell>
                    <TableCell>{sale.customer}</TableCell>
                    <TableCell>{sale.warehouse}</TableCell>
                    <TableCell>€ {sale.amount}</TableCell>
                    <TableCell>€ {sale.due}</TableCell>
                    <TableCell>{sale.method}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          sale.status === "Paid" ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Trash2
                        onClick={() => handleDelete(sale.id as number)}
                        className="h-4 w-4 cursor-pointer text-red-600"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
