import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Home,
  LogOut,
  Newspaper,
  Settings,
  User,
} from "lucide-react";
import React from "react";

type Props = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};
// ----------------- user dashboard sidebar items component
const SidebarItems: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  // sidebar items
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "posts", label: "Posts", icon: Newspaper },
    { id: "payments history", label: "Payments History", icon: CreditCard },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <ScrollArea className="h-full">
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
        <Separator className="my-4" />
        <Button className="w-[100%]" variant="outline">
          Upgrade now
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </ScrollArea>
  );
};

export default SidebarItems;
