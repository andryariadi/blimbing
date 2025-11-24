"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";

const Nabvar = () => {
  const { setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-10 border-b bg-background flex items-center justify-between p-4">
      {/* Collapse Sidebar Icon */}
      <SidebarTrigger />

      {/* Nav Items */}
      <div className="b-amber-500 flex items-center gap-4">
        <Link href="/">Dashboard</Link>

        {/* Dropdown Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun size={18} className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

              <Moon size={18} className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent sideOffset={10} align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown User */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>BL</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent sideOffset={12} align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-3">
              <User size={18} />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="gap-3">
              <Settings size={18} />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuItem variant="destructive" className="gap-3">
              <LogOut size={18} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Nabvar;
