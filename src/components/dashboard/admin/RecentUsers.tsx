import Loading from "@/components/message/Loading";
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
import { useGetAllUsersQuery } from "@/redux/features/users/userApi";
import { TUser } from "@/types/userType";

const RecentUsers = () => {
  // ---------------- redux
  const { data: users = { data: [] }, isLoading } = useGetAllUsersQuery({
    limit: 5,
  });

  if (isLoading) {
    return <Loading />;
  }

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
              <TableHead>Gender</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users?.data?.map((user: TUser) => (
              <TableRow key={user?._id}>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.gender}</TableCell>
                <TableCell>{user?.createdAt}</TableCell>
                <TableCell>{user?.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentUsers;
