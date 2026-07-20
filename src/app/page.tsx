import Link from "next/link";
import {
  CodeXmlIcon,
  BracesIcon,
  FileTextIcon,
  MenuIcon,
  Braces,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Classrooms } from "@/components/classrooms";
import { Hero } from "@/components/hero";
import Image from "next/image";

import illustration from "@/../public/Gemini_Generated_Image_t3pa0tt3pa0tt3pa.png";
import { Repositories } from "@/components/repositories";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const links = [
    {
      label: "Material de Apoio",
      href: "#aulas",
      icon: <FileTextIcon />,
    },
    {
      label: "Nossos Códigos",
      href: "#codigos",
      icon: <BracesIcon />,
    },
    // {
    //   label: "Contatos",
    //   href: "#contatos",
    // },
  ];

  return (
    <>
      <header className="border-b p-4 fixed top-0 left-0 w-full backdrop-blur-sm z-50">
        <div className="container mx-auto flex items-center justify-around flex-wrap max-sm:gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded size-8 text-white flex items-center justify-center">
              <CodeXmlIcon />
            </div>
            <h1 className="font-semibold">Paraíbatec/Pronatec</h1>
          </Link>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon">
                  <MenuIcon />
                </Button>
              }
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle className={"font-bold"}>Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-4 p-4 w-full">
                {links.map((link, index) => (
                  <Link href={link.href} key={index} className="w-full">
                    <Button
                      className={"w-full justify-start"}
                      variant="outline"
                    >
                      {link.icon}
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* <Button className="text-white font-semibold cursor-pointer">
            Login
          </Button> */}
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-2 my-12">
        <Hero />

        <section className="w-full my-24 mx-auto">
          <Image
            src={illustration}
            alt="Illustration"
            className="w-full rounded object-cover [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)]"
          />
        </section>
        <Classrooms />
        <Repositories />
      </main>

      <footer className="flex items-center justify-center flex-col gap-2 py-4 bg-primary text-black">
        <p className="text-sm">
          Desenvolvido por{" "}
          <span className="font-semibold">Wllysses Tavares</span>
        </p>
        {/* <div className="flex items-center gap-4 text-sm">
          <Link
            href="https://github.com/wllysses"
            target="_blank"
            className="hover:underline"
          >
            Github
          </Link>
          <Link
            href="https://linkedin.com/in/wllysses"
            target="_blank"
            className="hover:underline"
          >
            Linkdin
          </Link>
        </div> */}
      </footer>
    </>
  );
}
