"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search, X } from "lucide-react";
import {  useAppSelector } from "@/redux/hooks";
import UserProfileMenu from "./UserProfileMenu";

const Navbar = () => {
  // redux
  const isLoggedIn = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Ensure that the component has mounted on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // nav items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Feeds", href: "/posts" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const userImage = user?.profilePicture || "/demo.webp";

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between h-16">
          {/* Desktop navbar  */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold">Travel Tips</span>
            </Link>

            {/* Nav items  */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* right side search and login/logout/avatar */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* search field  */}
              <form className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full bg-background text-foreground pr-10"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>

              {/* if no mounted, show skeleton. ifloggedin show user image or avatar  */}
              {!mounted ? (
                // Tiny localized skeleton
                <div className="flex items-center ms-3 space-x-2">
                  <div className="h-7 w-7 bg-muted rounded-full animate-pulse" />
                  <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
                </div>
              ) : isLoggedIn ? (
                <>
                  <Button variant="ghost" size="icon" className="ml-2" asChild>
                    <Link href="/notifications">
                      <Bell className="h-5 w-5" />
                    </Link>
                  </Button>
                  {/* user profile menu  */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          width={100}
                          height={100}
                          src={userImage}
                          alt="User avater"
                        />
                        <AvatarFallback>
                          {user?.name
                            ? user.name.substring(0, 2).toUpperCase()
                            : "LP"}
                        </AvatarFallback>
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-fit p-4">
                      <UserProfileMenu />
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <div className="flex items-center ml-2 space-x-2">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* open menu in small device  */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoggedIn ? (
              <UserProfileMenu />
            ) : (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
