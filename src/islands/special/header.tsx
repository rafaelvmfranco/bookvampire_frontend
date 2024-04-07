"use client";

import { useState } from "react";
import Link from "next/link";
import LocalizationMainSwitcher from "~/localization";
import {
  Book,
  DoorOpen,
  Home,
  ListRestart,
  Pencil,
  Trash,
  UserCircle,
} from "lucide-react";
import { PlusCircle } from "lucide-react";
import { Button, buttonVariants } from "~/islands/ui/button";
import { ThemeSwitcher } from "./themes";
import { cn } from "~/core/utils";
import { usePathname } from "~/navigation";
import { NewBookModal } from "../popups/create-new-book";
import Image from "next/image";
import BookVampireLogo from "~/core/assets/logo.png";

interface HeaderProps {
  stick: boolean;
}

export const Header: React.FC<HeaderProps> = ({ stick = false }) => {
  const pathname = usePathname();

  const libraryPaths = ["/library", "/library/1", "/library/2", "/library/3"];

  const [showNewBookModal, setShowNewBookModal] = useState(false);

  const handleNewBook = () => {
    setShowNewBookModal(true);
  };

  const handleSaveNewBook = (newBook) => {
    console.log("New book:", newBook);
  };

  const conditionalButtons = () => {
    if (pathname === "/chat") {
      return (
        <>
          <Button
            onClick={handleNewBook}
            className="whitespace-nowrap px-3"
            variant="secondary"
          >
            <PlusCircle className="sm:mr-2 max-w-5" />
            <span className="hidden sm:flex">
              <span>New</span>
              <span className="whitespace-nowrap hidden lg:block ml-1">
                book
              </span>
            </span>
          </Button>

          <Link
            href="/library/1"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "whitespace-nowrap px-3",
            )}
          >
            <Pencil className="sm:mr-2 max-w-4" />
            <span className="hidden sm:flex">
              <span>Manage</span>
              <span className="whitespace-nowrap hidden lg:block ml-1">
                book
              </span>
            </span>
          </Link>

          <div className="bg-transparent" />
          <div className="h-14 w-px bg-slate-200 dark:bg-muted" />
          <div className="bg-transparent" />
        </>
      );
    }
    if (pathname === "/search" || pathname === "/library") {
      return (
        <>
          <Button
            onClick={handleNewBook}
            className="whitespace-nowrap px-3"
            variant="secondary"
          >
            <PlusCircle className="sm:mr-2 max-w-5" />
            <span className="hidden sm:block">New book</span>
          </Button>

          <div className="bg-transparent" />
          <div className="h-14 w-px bg-slate-200 dark:bg-muted" />
          <div className="bg-transparent" />
        </>
      );
    }
    if (libraryPaths.includes(pathname)) {
      return (
        <>
          <Link
            href="/library"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "whitespace-nowrap px-3",
            )}
          >
            <Trash className="sm:mr-2 max-w-4" />
            <span className="hidden sm:block">Delete book</span>
          </Link>

          <div className="bg-transparent" />
          <div className="h-14 w-px bg-slate-200 dark:bg-muted" />
          <div className="bg-transparent" />
        </>
      );
    }
    if (pathname === "/user") {
      return (
        <>
          <Link
            href="/auth/signin"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "whitespace-nowrap px-3",
            )}
          >
            <DoorOpen className="sm:mr-2 max-w-5" />
            <span className="hidden sm:block">Log out</span>
          </Link>

          <div className="bg-transparent" />
          <div className="h-14 w-px bg-slate-200 dark:bg-muted" />
          <div className="bg-transparent" />
        </>
      );
    }
    if (pathname === "/auth/signin") {
      return null;
    }
    return (
      <>
        <Link
          href="/auth/signin"
          className={cn(
            buttonVariants({ variant: "default" }),
            "whitespace-nowrap px-3 mr-1",
          )}
        >
          <span>Sign up | Sign in</span>
        </Link>
      </>
    );
  };

  /* CURRENT PAGE */
  const currentPage = () => {
    if (pathname === "/") {
      return (
        <>
          <div className="flex items-center -ml-1">
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
            <div className="ml-2 text-accent dark:text-white font-bold flex flex-col">
              <span>Book</span>
              <span>Vampire</span>
            </div>
          </div>
        </>
      );
    }
    if (pathname === "/auth/signin") {
      return (
        <>
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
            <div className="ml-2 text-accent dark:text-white font-bold flex flex-col">
              <span>Book</span>
              <span>Vampire</span>
            </div>
          </Link>
        </>
      );
    }
    if (pathname === "/chat") {
      return (
        <>
          <div
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "whitespace-nowrap px-3",
            )}
          >
            <ListRestart className="mr-2 max-w-5 text-primary" />
            <span>Thread</span>
          </div>
        </>
      );
    }
    if (pathname === "/search") {
      return (
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "whitespace-nowrap px-3",
          )}
        >
          <Home className="mr-2 max-w-5 text-primary" />
          <span>Home</span>
        </div>
      );
    }
    if (pathname === "/library") {
      return (
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "whitespace-nowrap px-3",
          )}
        >
          <Book className="mr-2 max-w-5 text-primary" />
          <span>Library</span>
        </div>
      );
    }
    if (libraryPaths.includes(pathname)) {
      return (
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "whitespace-nowrap px-3",
          )}
        >
          <Book className="mr-2 max-w-5 text-primary" />
          <span>Book</span>
        </div>
      );
    }
    if (pathname === "/user") {
      return (
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "whitespace-nowrap px-3",
          )}
        >
          <UserCircle className="mr-2 max-w-5 text-primary" />
          <span>Profile</span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <header
        className={cn(
          "top-0 left-0 right-0 z-10 flex items-center justify-between px-4 border-b border-slate-200 dark:border-muted h-16",
          stick ? "fixed" : "relative",
        )}
      >
        <div className="flex items-center">
          <div className="">{currentPage()}</div>
        </div>

        <div className="flex items-center space-x-2">
          {conditionalButtons()}

          <LocalizationMainSwitcher />
          <ThemeSwitcher />
        </div>
      </header>

      {showNewBookModal && (
        <NewBookModal
          onClose={() => setShowNewBookModal(false)}
          onSave={handleSaveNewBook}
        />
      )}
    </>
  );
};
