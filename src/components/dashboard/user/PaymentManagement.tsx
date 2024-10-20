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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  ChevronDown,
  DollarSign,
  FileText,
  RefreshCcw,
  Search,
} from "lucide-react";

// Mock data for payments
const mockPayments = [
  {
    id: "PAY001",
    user: "Jane Doe",
    amount: 99.99,
    date: "2023-06-15",
    status: "Completed",
    type: "Subscription",
  },
  {
    id: "PAY002",
    user: "John Smith",
    amount: 49.99,
    date: "2023-06-14",
    status: "Pending",
    type: "One-time",
  },
  {
    id: "PAY003",
    user: "Alice Johnson",
    amount: 149.99,
    date: "2023-06-13",
    status: "Completed",
    type: "Subscription",
  },
  {
    id: "PAY004",
    user: "Bob Wilson",
    amount: 29.99,
    date: "2023-06-12",
    status: "Failed",
    type: "One-time",
  },
  {
    id: "PAY005",
    user: "Emma Brown",
    amount: 199.99,
    date: "2023-06-11",
    status: "Completed",
    type: "Subscription",
  },
];

export default function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 5;

  // Filter and sort payments
  const filteredPayments = mockPayments
    .filter(
      (payment) =>
        payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else {
        return a.user.localeCompare(b.user);
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

  const handleRefund = (id: string) => {
    console.log(`Refund payment with id: ${id}`);
  };

  const handleViewInvoice = (id: string) => {
    console.log(`View invoice for payment with id: ${id}`);
  };

  const handleRetry = (id: string) => {
    console.log(`Retry payment with id: ${id}`);
  };

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
                <TableHead className="text-right font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPayments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.user}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(payment.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === "Completed"
                          ? "default"
                          : payment.status === "Pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {payment.status === "Completed" && (
                          <DropdownMenuItem
                            onClick={() => handleRefund(payment.id)}
                          >
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            <span>Refund</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => handleViewInvoice(payment.id)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span>View Invoice</span>
                        </DropdownMenuItem>
                        {payment.status === "Failed" && (
                          <DropdownMenuItem
                            onClick={() => handleRetry(payment.id)}
                          >
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            <span>Retry Payment</span>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
}
