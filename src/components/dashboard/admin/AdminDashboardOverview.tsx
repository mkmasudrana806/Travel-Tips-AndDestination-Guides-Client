"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, DollarSign } from "lucide-react";
import MonthlyOverview from "@/components/dashboard/admin/MonthlyOverviewChart";
import RecentUsers from "./RecentUsers";
import RecentPosts from "./RecentPosts";
import { useGetAdminInsightsQuery } from "@/redux/features/insights/insightApi";
import Loading from "@/components/message/Loading";

// ------------------ admin dashboard
const AdminDashboardOverview = () => {
  // ------------ redux
  const { data: insights, isLoading } = useGetAdminInsightsQuery(undefined);

  return (
    <div className="container mx-auto pb-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* total revenue  */}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${insights?.data?.totalRevenue}
              </div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>

          {/* active total users  */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {" "}
                {insights?.data?.totalUsers}
              </div>
              <p className="text-xs text-muted-foreground">
                +180 new users this week
              </p>
            </CardContent>
          </Card>

          {/* total posts  */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {" "}
                {insights?.data?.totalPosts}
              </div>
              <p className="text-xs text-muted-foreground">
                +7.4% from last week
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* monthly overview of posts, revenue and users  */}
      <MonthlyOverview />

      {/* recent users and recents posts  */}
      <div className="grid gap-4  mb-8">
        <RecentUsers />
        <RecentPosts />
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
