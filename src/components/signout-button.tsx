"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  async function handleSignOut() {
    await signOut();
  }

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      <LogOutIcon />
      Sair
    </Button>
  );
}
