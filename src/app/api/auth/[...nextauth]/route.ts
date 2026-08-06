import { nextAuthOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as POST, handler as GET };
