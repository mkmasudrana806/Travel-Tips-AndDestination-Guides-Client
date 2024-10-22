"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useLoadAllPaymentsQuery } from "@/redux/features/payments/paymentApi";
import { TPayment } from "@/types/paymentType";
import Loading from "@/components/message/Loading";

// --------------- payment management component
const PaymentManagement = () => {
  // -------------- redux
  const { data: payments = { data: [] }, isLoading } =
    useLoadAllPaymentsQuery(undefined);

  // --------------- react
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  // Filter and sort payments
  const filteredPayments = payments?.data
    ?.filter(
      (payment: TPayment) =>
        payment?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment?.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a: TPayment, b: TPayment) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return a.username.localeCompare(b.username);
      }
    });

  // Paginate payments
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Payment Management
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center w-full sm:w-auto">
            <Input
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mr-2"
            />
            <Button size="icon" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="amount">Sort by Amount</SelectItem>
              <SelectItem value="user">Sort by User</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* payment table  */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700">
                <TableHead className="font-bold">Payment ID</TableHead>
                <TableHead className="font-bold">User</TableHead>
                <TableHead className="font-bold">Amount</TableHead>
                <TableHead className="font-bold">Date</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Type</TableHead>
              </TableRow>
            </TableHeader>

            {/* table body  */}
            <TableBody>
              {currentPayments.map((payment: TPayment) => (
                <TableRow
                  key={payment?._id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <TableCell className="font-medium">
                    {payment?.transactionId}
                  </TableCell>
                  <TableCell>{payment?.username}</TableCell>
                  <TableCell>${payment?.amount?.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(payment?.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment?.status === "completed"
                          ? "default"
                          : payment?.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {payment?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment?.subscriptionType}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* pagination  */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {indexOfFirstPayment + 1}-
            {Math.min(indexOfLastPayment, filteredPayments.length)} of{" "}
            {filteredPayments.length}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentManagement;
