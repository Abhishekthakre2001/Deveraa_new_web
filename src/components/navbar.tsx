import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import LogoSM from "../app/assets/logo-sm.png"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            {/* <span className="inline-block font-bold text-xl">Deveraa</span> */}
            <Image
              src={LogoSM}
              alt="Deveraa Logo"
              width={160}
              height={45}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/services"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Portfolio
            </Link>
            <Link
              href="/about"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/contact" className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            Book Meeting
          </Link>
        </div>
      </div>
    </header>
  );
}
