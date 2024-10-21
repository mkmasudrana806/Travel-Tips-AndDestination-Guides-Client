"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DashboardOverview from "@/components/dashboard/user/DashboardOverview";
import PaymentManagement from "../../components/dashboard/user/PaymentManagement";
import TravelBlog from "../../components/dashboard/user/TravelBlog";
import AccountSettings from "@/components/dashboard/user/AccountSettingsPage";
import SidebarItems from "@/components/dashboard/user/SidebarItems";
 
// ------- user dashboard main layout
const UserDashboard = () => {

  // ------------ react
  const [activeTab, setActiveTab] = useState("overview");

  // ------------ render nav items content
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />;
      case "posts":
        return <TravelBlog />;
      case "payments history":
        return <PaymentManagement />;
      case "settings":
        return <AccountSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-48 border-r bg-card">
        <div className="p-2">
          <h2 className="text-lg font-semibold mb-4">User Dashboard</h2>
          <SidebarItems setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <div className="md:hidden border-b p-4 flex justify-between items-center bg-card">
          <h2 className="text-lg font-semibold">User Dashboard</h2>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarItems setActiveTab={setActiveTab} activeTab={activeTab} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Dashboard content */}
        <div className="flex-1 pt-4 ps-4 overflow-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default UserDashboard;
