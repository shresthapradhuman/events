"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { logoutAction } from "../(auth)/actions";
import { User } from "next-auth";
import { useRouter } from "next/navigation";

const UserNavigation = ({ user }: { user: User }) => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user?.image || ""} alt={user?.name || "avatar"} />
          <AvatarFallback className="font-medium uppercase tracking-tight">
            {user
              ? `${user?.name?.split(" ")[0].charAt(0)}  ${user?.name?.split(" ")[1].charAt(0)}`
              : "GU"}
          </AvatarFallback>
        </Avatar>
        <div className="w-1/2 flex-auto text-left md:hidden">
          <h3 className="text-xl font-normal">Pradhuman Shrestha</h3>
          <p className="truncate text-sm text-muted-foreground">ShresthaPradhuman2018@gmail.com</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="hidden md:block">
          <h3 className="text-xl font-normal">{user?.name}</h3>
          <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="hidden md:block" />
        <DropdownMenuItem asChild>
          <Link href={"/profile"}>
            <UserIcon />
            <span>Profile Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logoutAction();
            router.refresh()
          }}
        >
          <LogOutIcon />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavigation;
