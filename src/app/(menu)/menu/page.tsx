"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function MenuPage() {
  const { data: session } = useSession();

  async function handleSignOut() {
    await signOut();
  }

  function welcomeMessage() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Bom Dia";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Boa Tarde";
    } else {
      return "Bom Noite";
    }
  }

  return (
    <div className="container mx-auto">
      <header className="flex pt-2 justify-end">
        <Button variant="destructive" onClick={handleSignOut}>
          <LogOutIcon />
          Sair
        </Button>
      </header>

      <main className="mt-6">
        <Card className="p-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold">{welcomeMessage()},</h1>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{session?.user.name![0]}</AvatarFallback>
                <AvatarImage src={session?.user.image as string} />
              </Avatar>
              <div>
                <h2 className="font-semibold">{session?.user.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {session?.user.email}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
