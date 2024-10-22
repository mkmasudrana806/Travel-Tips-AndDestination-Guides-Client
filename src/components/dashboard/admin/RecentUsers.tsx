import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    joinDate: "2024-03-01",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    joinDate: "2024-03-02",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    joinDate: "2024-03-03",
  },
];

const RecentUsers = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
        <CardDescription>Latest user registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Join Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentUsers;
