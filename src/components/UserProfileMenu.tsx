import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const UserProfileMenu = () => {
  // ---------------- redux
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  // --------------- react
  // handle logout user
  const handleLogout = () => {
    dispatch(logout(undefined));
  };
  return (
    <>
      <div className="flex items-center px-5">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage
              src={
                user?.profilePicture
                  ? user?.profilePicture
                  : "/placeholder.svg?height=40&width=40"
              }
              alt="User"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-3">
          <div className="text-base font-medium">{user?.name}</div>
          <div className="text-sm font-medium text-muted-foreground">
            {user?.email}
          </div>
        </div>
      </div>
      <div className="mt-3 px-2 space-y-1">
        <Link
          href={`/${user?.role}`}
          className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Dashboard
        </Link>
        <Link
          href={`/profile/${user?.userId}`}
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
        <Button onClick={handleLogout} className="w-full">
          Log out
        </Button>
      </div>
    </>
  );
};

export default UserProfileMenu;
