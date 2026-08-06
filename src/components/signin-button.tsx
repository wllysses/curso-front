"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import githubicon from "@/../public/github.png";
import { signIn } from "next-auth/react";

export function SigninButton() {
  async function handleLoginWithGithub() {
    await signIn("github", {
      redirect: false,
    });
  }

  return (
    <Button className="gap-2" onClick={handleLoginWithGithub}>
      <Image src={githubicon} width={18} alt="Github Icon" loading="lazy" />
      Entrar com Github
    </Button>
  );
}
