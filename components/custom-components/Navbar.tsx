"use client";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";
import { Moon, Sun, Maximize2, Minimize2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock user data
const userData = {
  name: "Syed Mahmud",
  role: "Admin",
  avatar:
    "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=800",
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Theme toggle handler
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Updating the fullscreen state when user uses short-cut keys like: -> F11 or Esc
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <nav className="border-b bg-background dark:border-gray-800 shadow-md">
      <div className="flex h-16 items-center px-4 lg:px-6 xl:px-8 2xl:px-10">
        {/* Logo and Brand Name */}
        <div onClick={() => router.push("/")} className="flex items-center gap-2 cursor-pointer">
          <Image 
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="border rounded-full"
          />
          <span className="text-xl font-semibold text-foreground">B-POS</span>
        </div>

        {/* Right side controls */}
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center justify-center gap-4">
            <Link
              href={"/"}
              className={`${
                pathname === "/" ? "text-lime-500" : "text-foreground"
              } text-md font-bold cursor-pointer`}
            >
              Home
            </Link>

            <Link
              href={"/dashboard"}
              className={`${
                pathname === "/dashboard" ? "text-lime-500" : "text-foreground"
              } text-md font-bold cursor-pointer`}
            >
              Dashboard
            </Link>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-foreground"
          >
            {isFullscreen ? (
              <Minimize2 className="h-5 w-5" />
            ) : (
              <Maximize2 className="h-5 w-5" />
            )}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="pl-0">
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {userData.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {userData.role}
                    </p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>
                      {userData?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-lime-500" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/"} className="w-full cursor-pointer">
                  Home
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link href={"/dashboard"} className="w-full cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
