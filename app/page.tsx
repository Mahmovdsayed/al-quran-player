import { Chip, Link } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return <>
    <main className="min-h-screen flex items-center justify-center flex-col px-4 text-center">
      <Chip as={Link} showAnchorIcon href={'https://github.com/Mahmovdsayed'} target={"_blank"} startContent={<FaGithub />} size="sm" radius="sm">Mahmovdsayed</Chip>
      <h1 className="text-4xl md:text-6xl font-semibold uppercase mb-4 mt-2">
        Nextjs Template
      </h1>
      <span>Tailwindcss + Typescript + NextUI + NextPWA + React-Icons</span>
    </main>
  </>
}
