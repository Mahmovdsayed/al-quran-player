'use client'
import { surah } from "@/static/surah";
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Link } from "@nextui-org/react";
import { FaPlay } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";




export default function Home() {

  return (
    <main className="w-full pb-4 px-4">
      <div className="container mx-auto">
        <div className="mb-3">
          <h1 className="text-2xl md:text-4xl font-semibold">Comprehensive Quran Experience: Listen, Learn, and Understand</h1>
          <p className="text-default-600 text-tiny md:text-sm md:w-3/4">Explore the Quran. Listen to every Surah with over 50 renowned reciters, and delve into detailed verse interpretations in both Arabic and English. Whether you're seeking spiritual growth or educational insight, our platform provides a complete and immersive Quranic experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {surah.map((su, index) =>
            <Card key={index}>
              <CardHeader className="block">
                <div className="flex justify-between items-center">
                  <Chip size="sm" radius="sm" color="primary" className="mb-2">{su.revelationType}</Chip>
                  <Chip size="sm" radius="sm" className="mb-2">{su.numberOfAyahs}</Chip>
                </div>
                <p className="font-medium text-xl">
                  {su.englishName} - {su.name}
                </p>
                <p>{su.englishNameTranslation}</p>
              </CardHeader>
              <CardFooter className="flex items-center justify-center gap-4">
                <Button href={`/play/${su.number}`} as={Link} startContent={<FaPlay />} color="primary" className="w-full">Play</Button>
                <Button startContent={<IoShareSocial />} className="w-full">Share</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
