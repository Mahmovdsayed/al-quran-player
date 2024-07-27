import { Chip, Code, Link } from "@nextui-org/react";
import { FaGithub, FaGitAlt } from "react-icons/fa";

export default function Home() {
  return <>
    <main className="min-h-screen flex items-center justify-center flex-col px-4">
      <div>
        <Chip as={Link} showAnchorIcon href={'https://github.com/Mahmovdsayed'} target={"_blank"} startContent={<FaGithub />} size="sm" radius="sm">Mahmovdsayed</Chip>
      </div>
      <div className="mt-2">
        <Code color="default">gh repo clone Mahmovdsayed/nextjs-template</Code>
      </div>
      <div className="text-center mb-4 mt-2">
        <h1 className="text-4xl md:text-6xl font-semibold uppercase ">
          Nextjs Template
        </h1>
        <span className="text-sm md:text-medium text-default-500">Tailwindcss + Typescript + NextUI + NextPWA + React-Icons</span>
      </div>

    </main>
  </>
}
