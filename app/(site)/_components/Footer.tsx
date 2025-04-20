import React from "react";
import Link from "next/link";
import { HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { footerNavigationItems, socialLinksItems } from "@/constant";
import FooterNavigation from "./FooterNavigation";

const Footer = () => {
  return (
    <footer className="relative w-full bg-muted/50">
      <div className="container mx-auto flex max-w-screen-xl flex-wrap gap-10 px-4 py-12">
        <div className="max-w-md space-y-2">
          <h1 className="text-3xl">
            <Link href={"/"} className="flex items-center font-bold">
              EVE
              <HeadphonesIcon className="mx-1 h-6 w-6 stroke-primary" />
              TS
            </Link>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore and reserve your spot at the most exciting events taking place in your city.
          </p>
          <div className="flex items-center gap-2 pt-4">
            {socialLinksItems.map(({ label, icon: Icon, url }, key) => (
              <Button key={key} size={"icon"} variant={"outline"} asChild className="rounded-full">
                <Link href={url}>
                  <Icon />
                  <span className="sr-only">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-wrap justify-around">
          {footerNavigationItems.map(({ label, items }, key) => (
            <FooterNavigation key={key} label={label} items={items} />
          ))}
        </div>
      </div>
      <div className="flex w-full items-center justify-center border-t bg-background pb-3 pt-4 capitalize">
        @ {new Date().getFullYear()}
        <Link href={"/"} className="mx-1 flex items-center text-sm font-bold">
          events
        </Link>
        , All right reserved.
      </div>
    </footer>
  );
};

export default Footer;

{
  /* <footer className="border-t bg-background">
      <div className="container mx-auto max-w-screen-xl py-12">
        <div className="grid items-center gap-8 sm:grid-cols-2 md:grid-cols-2">
          <div className="space-y-2">
            <h1 className="text-4xl">
              <Link href={"/"} className="flex items-center font-bold">
                EVE
                <HeadphonesIcon className="mx-1 h-8 w-8 stroke-primary" />
                TS
              </Link>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover and book the best events happening in your city.
            </p>
            <div className="flex items-center gap-2 pt-4">
              <Button size={"icon"} variant={"outline"} asChild>
                <Link href={"/#"}>
                  <FacebookIcon />
                </Link>
              </Button>
              <Button size={"icon"} variant={"outline"} asChild>
                <Link href={"/#"}>
                  <InstagramIcon />
                </Link>
              </Button>
              <Button size={"icon"} variant={"outline"} asChild>
                <Link href={"/#"}>
                  <TwitterIcon />
                </Link>
              </Button>
              <Button size={"icon"} variant={"outline"} asChild>
                <Link href={"/#"}>
                  <YoutubeIcon />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xl font-medium">Company</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Who we are?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    How it works?
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog & News
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-medium">Resources</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Organizers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-medium">Others</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t py-3 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Events. All rights reserved.</p>
      </div>
    </footer> */
}
