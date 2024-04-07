/* [#] HomePage (page.tsx) */
import Image from "next/image";
import Balancer from "react-wrap-balancer";

import { cn } from "~/core/utils";
import { buttonVariants } from "~/islands/ui/button";
import { Link } from "~/navigation";
import { images } from "~/images";

export default function HomePage() {
  return (
    <>
      <section className="lg:flex items-center space-x-2 space-y-4">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-title space-y-2">
            <p>Quench your</p>
            <p>thirst for... wisdow!</p>
          </h1>
          <p className="text-xl font-medium max-w-[85%]">
            Enhance your reading experience by engaging in AI conversations with
            any book. Ask anything and unlock a world of knowledge.
          </p>
          <Link
            href="/auth/signin"
            className={cn(
              buttonVariants({ variant: "default" }),
              "whitespace-nowrap px-3 mt-5 flex flex-col items-center h-12 max-w-[50%]",
            )}
          >
            Get Started
          </Link>
        </div>
        <Image
          src={images.bookVampireHero}
          alt="Book Vampire"
          width="600"
          height="400"
          style={{
            aspectRatio: "600/400",
            objectFit: "scale-down",
          }}
        />
      </section>

      <section className="mx-auto space-y-8 text-center">
        <h2 className="font-title text-4xl md:text-5xl flex flex-col items-center">
          <span className="flex">Don't be scared,</span>
          <span className="flex">It's just an AI chatbot.</span>
        </h2>
        <Balancer as="p" className="text-xl">
          You only need the title and its author, and
          <br /> Artificial Intelligence takes care of the rest.
        </Balancer>
        <Link
          href="/auth/signin"
          className={cn(
            buttonVariants({ variant: "default" }),
            "whitespace-nowrap px-3 mt-5 flex flex-col items-center h-12 mx-[30%]",
          )}
        >
          Start for free
        </Link>
        <Image
          src={images.vampAndScreen}
          alt="Screenshot"
          width="1000"
          height="800"
          style={{
            aspectRatio: "16/9",
            objectFit: "scale-down",
          }}
        />
      </section>
    </>
  );
}
