import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetMonthlyOverviewQuery } from "@/redux/features/insights/insightApi";
import Loading from "@/components/message/Loading";

// -------------- monthly posts, comments, users and revenue overview chart
const MonthlyOverviewChart = () => {
  // ------------ redux
  const { data: monthlyOverview = { data: [] }, isLoading } =
    useGetMonthlyOverviewQuery(undefined);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
        <CardDescription>
          Platform activity for the last 6 months
        </CardDescription>
      </CardHeader>
      {isLoading ? (
        <Loading />
      ) : (
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyOverview?.data?.slice(6)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="payments" fill="#8884d8" name="Payments" />
              <Bar dataKey="users" fill="#82ca9d" name="New Users" />
              <Bar dataKey="posts" fill="#ffc658" name="New Posts" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  );
};

export default MonthlyOverviewChart;
