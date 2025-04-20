import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AuthNavigation = () => {
  return (
    <div className="flex items-center gap-2 max-sm:flex-col">
      <Button variant={"outline"} asChild className="max-sm:w-full">
        <Link href={"/login"}>Log In</Link>
      </Button>
      <Button asChild className="max-sm:w-full">
        <Link href={"/register"}>Register</Link>
      </Button>
    </div>
  );
};

export default AuthNavigation;
