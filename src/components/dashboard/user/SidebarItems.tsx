import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/features/users/userApi";
import { CreditCard, Home, LogOut, Newspaper, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};
// ----------------- user dashboard sidebar items component
const SidebarItems: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  // --------------- redux
  const dispatch = useDispatch();
  const { data: user = { data: {} } } = useGetMyProfileQuery(undefined);

  // react
  const router = useRouter();
  // --------------- handle logout
  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  // sidebar items
  const sidebarItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "posts", label: "Posts", icon: Newspaper },
    { id: "payments history", label: "Payments History", icon: CreditCard },
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

        {!user?.data?.premiumAccess && (
          <Link href={"/upgrade"}>
            <Button className="w-[100%] mt-2" variant="outline">
              Upgrade now
            </Button>
          </Link>
        )}

        <Button
          onClick={handleLogout}
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
