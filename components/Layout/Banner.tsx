'use client'

import { getRandomAyah } from "@/context/surahContext";
import { Button, Spinner } from "@nextui-org/react";
import { useState, useCallback, useMemo, useRef } from "react";
import { BsStars } from "react-icons/bs";
import AyahCard from "../UI/AyahCard";
import Search from "./Search";
// import AdBanner from "./AdBanner";

interface IProps { }

const Banner = ({ }: IProps) => {
    const [verse, setVerse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleRandom = useCallback(async () => {
        setLoading(true);
        const data = await getRandomAyah();
        setVerse(data.verse);
        setLoading(false);
    }, []);


    const renderAyahCard = useMemo(() => {
        if (loading) return <div className="flex items-center justify-center my-3"><Spinner /></div>;



        return verse ? (
            <div className="container mx-auto">
                <AyahCard
                    ayah={verse?.text_uthmani}
                    ayahENn={verse?.translations[0].text}
                    numberInSurah={verse?.verse_number}
                    sound={verse?.id}
                    surahId={verse?.chapter_id}
                    key={verse?.id}
                />
            </div>
        ) : null;
    }, [verse, loading]);

    return (
        <div className="w-full pt-10 bg-gradient-to-b from-gray-200 to-white dark:bg-gradient-to-b dark:from-[#22213d] dark:to-black flex items-center justify-center">
            <div className="text-center px-4">
{/*                 <AdBanner /> */}
                <h1 className="text-2xl md:text-4xl font-semibold my-3">
                    Comprehensive Quran Experience: Listen, Learn, and Understand
                </h1>
                <p className="text-default-600 px-4 text-tiny md:text-sm md:w-3/4 m-auto">
                    Explore the Quran. Listen to every Surah with over 50 renowned reciters, and delve into detailed verse interpretations in both Arabic and English. Whether you're seeking spiritual growth or educational insight, our platform provides a complete and immersive Quranic experience.
                </p>
                <Button
                    onClick={handleRandom}
                    radius="full"

                    size="md"
                    startContent={<BsStars size={20} />}
                    className="mt-4 text-center w-full text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 font-medium md:w-auto"
                >
                    Random Ayah
                </Button>

                <div className="mt-6">
                    {renderAyahCard}
                </div>
                <Search />
            </div>
        </div>
    );
};

export default Banner;
