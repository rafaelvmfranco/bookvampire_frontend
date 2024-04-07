"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Book,
  CreditCard,
  Home,
  ListRestart,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import BookVampireLogo from "~/core/assets/logo.png";
import { Input } from "~/islands/ui/input";
import { Button, buttonVariants } from "~/islands/ui/button";
import { cn } from "~/core/utils";
import { usePathname } from "~/navigation";
import Balancer from "react-wrap-balancer";
import { PricingTableModal } from "../popups/upgrade-my-plan";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const pathname = usePathname();

  const libraryPaths = ["/library", "/library/1", "/library/2", "/library/3"];

  // Define the paths where the sidebar should be displayed
  const sidebarPaths = [
    ...libraryPaths,
    "/chat",
    "/library",
    "/search",
    "/user",
  ];
  // Check if the current path is included in the sidebarPaths array
  const isMenuDisplayed = pathname ? sidebarPaths.includes(pathname) : false;

  const [showPricingPopup, setShowPricingPopup] = useState(false);

  const handleUpgradePlan = () => {
    setShowPricingPopup(true);
  };

  const handleSavePlan = (selectedPlan) => {
    // Handle saving the selected plan
    console.log("Selected plan:", selectedPlan);
    setShowPricingPopup(false);
  };

  return (
    <>
      {isMenuDisplayed && (
        <div
          className={`${
            isOpen ? "w-20 sm:w-44 md:w-52 lg:w-64" : "w-20"
          } top-0 left-0 bottom-0 border bg-card p-5 text-sm duration-300`}
        >
          {/* REVEAL BUTTON */}
          <div className="flex h-full flex-col items-start">
            {isOpen ? (
              <Button
                className="left-4 sm:left-32 md:left-40 lg:left-52 absolute top-4 cursor-pointer hidden sm:block"
                onClick={toggleSidebar}
                variant="ghost"
              >
                <ArrowLeftFromLine />
              </Button>
            ) : (
              <Button
                className="left-3 absolute top-4 cursor-pointer"
                onClick={toggleSidebar}
                variant="ghost"
              >
                <ArrowRightFromLine />
              </Button>
            )}

            {/* WEBSITE LOGO */}
            <div
              className={`${
                isOpen ? "block" : "block"
              } ml-2 flex h-full flex-col`}
            >
              {isOpen && (
                <Link href="/" className="flex items-center -ml-1">
                  <Image
                    src={BookVampireLogo}
                    alt="Book Vampire Logo"
                    height="32"
                    width="32"
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "scale-down",
                    }}
                  />
                  <div className="sm:ml-2 text-accent dark:text-white font-bold hidden sm:flex sm:flex-col">
                    <span>Book</span>
                    <span>Vampire</span>
                  </div>
                </Link>
              )}

              {/* SIDEBAR NAVIGATION */}
              <div
                className={`flex w-full items-center space-x-2 -ml-3 ${
                  isOpen ? "mt-6" : "mt-12"
                }`}
              >
                {isOpen && (
                  <Input
                    type="email"
                    placeholder="New search"
                    className="border border-accent/10 dark:border-muted hidden sm:block"
                  />
                )}
                <Link
                  href="/search"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "px-2 flex-col ml-1",
                  )}
                >
                  <Search className="max-w-4" />
                </Link>
              </div>

              <nav className="flex flex-1 flex-col mt-10">
                <ul className="flex-1">
                  <li className="mb-5">
                    <Link
                      href="/search"
                      className={cn("flex items-center relative", {
                        "before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-primary before:rounded":
                          pathname === "/search",
                      })}
                    >
                      <Home className="mr-2 text-primary" />
                      {isOpen && <span className="hidden sm:block">Home</span>}
                    </Link>
                  </li>
                  <li className="mb-5">
                    <Link
                      href="/library"
                      className={cn("flex items-center relative", {
                        "before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-primary before:rounded":
                          pathname === "/library",
                      })}
                    >
                      <Book className="mr-2 text-primary" />
                      {isOpen && (
                        <span className="hidden sm:block">Library</span>
                      )}
                    </Link>
                  </li>
                  <li className="mb-5">
                    <Link
                      href="/chat"
                      className={cn("flex items-center relative", {
                        "before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-primary before:rounded":
                          pathname === "/chat",
                      })}
                    >
                      <ListRestart className="mr-2 text-primary" />
                      {isOpen && (
                        <span className="hidden sm:block">Threads</span>
                      )}
                    </Link>
                  </li>
                </ul>
              </nav>

              <div>
                <ul>
                  <li className="mb-5">
                    <Link
                      href="/user"
                      className={cn("flex items-center relative", {
                        "before:absolute before:left-[-20px] before:top-1/2 before:transform before:-translate-y-1/2 before:w-1 before:h-[70%] before:bg-primary before:rounded":
                          pathname === "/user",
                      })}
                    >
                      <User className="mr-2 text-primary" />
                      {isOpen && (
                        <>
                          <span className="hidden sm:block">Profile</span>
                          <span className="ml-1 hidden lg:block">
                            & settings
                          </span>
                        </>
                      )}
                    </Link>
                  </li>
                  <li className="mb-5 -ml-4">
                    <Button
                      onClick={handleUpgradePlan}
                      variant="ghost"
                      className="flex items-center text-green-600 dark:text-green-400"
                    >
                      <CreditCard className="mr-2" />
                      {isOpen && (
                        <>
                          <span className="hidden sm:block">Upgrade</span>
                          <span className="ml-1 hidden lg:block">my plan</span>
                        </>
                      )}
                    </Button>
                  </li>
                  {isOpen && (
                    <li className="mb-5 hidden lg:block text-sm">
                      <Balancer as="p">
                        Debug mode is activated. Some app features may not work
                        as expected.
                      </Balancer>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPricingPopup && (
        <PricingTableModal
          onClose={() => setShowPricingPopup(false)}
          onSave={handleSavePlan}
        />
      )}
    </>
  );
};
