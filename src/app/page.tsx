import Image from "next/image";

import { IndustryTabs } from "@/components/industry-tabs";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start h-full grow">
        <h1 className="text-4xl font-bold flex items-center gap-2 w-full justify-center">
          Rightbrain
          <Image src="/logo.png" alt="Rightbrain Logo" width={64} height={64} />
        </h1>
        <p className="text-muted-foreground text-center w-full">
          A demo implementation of the Rightbrain SDK with Next.js API routes
          and OAuth2.
        </p>
        <p className="text-muted-foreground text-center w-full">
          Select an industry below to try it out.
        </p>

        <div className="w-full max-w-5xl mx-auto h-full overflow-y-auto">
          <IndustryTabs />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://docs.rightbrain.ai/intro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://rightbrain.ai/#case-studies"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Case Studies
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://rightbrain.ai/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to rightbrain.ai →
        </a>
      </footer>
    </>
  );
}
