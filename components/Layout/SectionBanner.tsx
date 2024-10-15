'use client'

import { surah } from "@/static/surah";
import { Button, Link } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Bread from "../UI/Bread";
import { FaInfo, FaPlay, FaReadme } from "react-icons/fa";
import Search from "./Search";
// import AdBanner from "./AdBanner";

interface IProps {
    url: string
}

const SectionBanner = ({ url }: IProps) => {
    const { slug } = useParams();
    const router = useRouter()
    // Find the Surah that matches the 'slug'
    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id + 1)
        : null;
    return (
        <div className="w-full pt-10 bg-gradient-to-b from-gray-200 to-white dark:bg-gradient-to-b dark:from-[#22213d] dark:to-black flex flex-col items-center justify-center">
            <div className="text-center px-4">
                <div className="flex items-center justify-center">
                    <Bread name={selectedSurah ? `Surah ` + selectedSurah.name_complex : 'Surah not found'} />
                </div>
                {/*                 <div className="my-3">
                    <AdBanner />
                </div> */}
                <h1 className="text-2xl md:text-4xl font-semibold mb-3">
                    {/* Display 'name_complex' if Surah is found, otherwise show a fallback */}
                    {selectedSurah ? `Surah ` + selectedSurah.name_complex : 'Surah not found'}
                </h1>
                <p className="text-default-600 px-4 text-tiny md:text-sm">
                    {selectedSurah ? `Discover Surah ${selectedSurah?.name_simple} (سوره ${selectedSurah?.name_arabic}), the ${selectedSurah?.id}th chapter of the Quran, revealed in ${selectedSurah?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${selectedSurah?.name_simple} and explore its profound meanings and messages.` : 'Surah not found'}
                </p>
                <div className="flex justify-center space-x-2 items-center my-4">
                    <Button
                        className="w-full"
                        isDisabled={!previousSurah}

                        onClick={() => {
                            if (previousSurah) {
                                router.push(`/${url}/${previousSurah.id}`);
                            }
                        }}
                    >
                        Previous Surah
                    </Button>

                    <Button
                        className="w-full"

                        isDisabled={!nextSurah}
                        onClick={() => {
                            if (nextSurah) {
                                router.push(`/${url}/${nextSurah.id}`);
                            }
                        }}
                    >
                        Next Surah
                    </Button>
                </div>
                <div className="my-4">
                    <Search />
                </div>
                <div className="flex items-center justify-center space-x-2 ">
                    <Button startContent={<FaReadme />} onClick={() => router.push(`/${"read"}/${slug}`)} variant="flat" size="sm">Read Surah</Button>
                    <Button startContent={<FaPlay />} onClick={() => router.push(`/${"play"}/${slug}`)} variant="flat" size="sm">Play Audio</Button>
                    <Button startContent={<FaInfo />} onClick={() => router.push(`/${"info"}/${slug}`)} variant="flat" size="sm">Surah Info</Button>
                </div>


            </div>
        </div>
    );
};

export default SectionBanner;
