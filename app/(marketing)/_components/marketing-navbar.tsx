import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export const MarketingHeader = () => {
  return (
    <header className="relative overflow-hidden border-b border-white/5 py-6">
      <div className="relative flex justify-between w-full mx-auto max-w-7xl">
        <div className="flex flex-row items-center justify-between text-sm text-white lg:justify-start">
          <Logo />
        </div>
        <nav className="items-center flex-grow hidden md:flex md:flex-row md:justify-end md:pb-0">
          <div className="inline-flex items-center gap-2 list-none lg:ml-auto">
            <ThemeToggle />
            <Button
              asChild
              className="items-center inline-flex focus:outline-none justify-center text-white bg-[#7600FF] duration-200 focus-visible:outline-black focus-visible:ring-black font-medium hover:bg-[#7600FF]/70 hover:border-white hover:text-white lg:w-auto px-6 py-3 rounded-full text-center w-full transform hover:-translate-y-1 transition duration-400"
            >
              <Link href="/sign-in" >Sign In</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
