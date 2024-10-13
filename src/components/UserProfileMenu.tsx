import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfileMenu = () => {
  return (
    <>
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-3">
          <div className="text-base font-medium">User Name</div>
          <div className="text-sm font-medium text-muted-foreground">
            user@example.com
          </div>
        </div>
      </div>
      <div className="mt-3 px-2 space-y-1">
        <Link
          href="/user-dashboard"
          className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Dashboard
        </Link>
        <Link
          href="/profile/1"
          className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Profile
        </Link>
        <Link
          href="/settings"
          className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Settings
        </Link>
        <Link
          href="/notifications"
          className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Notifications
        </Link>
        <Button className="w-full">Log out</Button>
      </div>
    </>
  );
};

export default UserProfileMenu;
