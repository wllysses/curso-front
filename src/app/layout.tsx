import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/auth";

const poppins = Poppins({
  weight: ["200", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Curso de Desenvolvedor de Aplicativos para Mídias Digitais",
  description:
    "Aplicação criada para auxiliar a consulta de materiais pelos estudantes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.className} dark antialiased`}>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
