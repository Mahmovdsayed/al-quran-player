'use client'

import { juzs } from "@/static/juzs";
import { Button } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { FaInfo, FaPlay, FaReadme } from "react-icons/fa";
import Bread from "../UI/Bread";
import Search from "../Layout/Search";

interface IProps {
    url: string;
}

const JuzBanner = ({ url }: IProps) => {
    const { slug } = useParams();
    const router = useRouter();

    // Find the Juz that matches the 'slug'
    const selectedJuz = juzs.find((juz) => juz.juz_number.toString() === slug);

    // Find the previous and next Juz
    const previousJuz = selectedJuz
        ? juzs.find((juz) => juz.juz_number === selectedJuz.juz_number - 1)
        : null;
    const nextJuz = selectedJuz
        ? juzs.find((juz) => juz.juz_number === selectedJuz.juz_number + 1)
        : null;

    return (
        <div className="w-full pt-10 bg-gradient-to-b from-gray-200 to-white dark:bg-gradient-to-b dark:from-[#22213d] dark:to-black flex flex-col items-center justify-center">
            <div className="text-center px-4">
                <div className="flex items-center justify-center">
                    <Bread name={selectedJuz ? `Juz ` + selectedJuz.juz_number : 'Juz not found'} />
                </div>
                <h1 className="text-2xl md:text-4xl font-semibold mb-3">
                    {selectedJuz ? `Juz ` + selectedJuz.juz_number : 'Juz not found'}
                </h1>
                <p className="text-default-600 px-4 text-tiny md:text-sm">
                    {selectedJuz
                        ? `Explore Juz ${selectedJuz.juz_number} of the Quran. This Juz contains portions of various Surahs, each with profound meanings and messages. Dive into the recitation and understanding of this Juz.`
                        : 'Juz not found'}
                </p>
                <div className="flex justify-center space-x-2 items-center my-4">
                    <Button
                        className="w-full"
                        isDisabled={!previousJuz}
                        onClick={() => {
                            if (previousJuz) {
                                router.push(`/${url}/${previousJuz.juz_number}`);
                            }
                        }}
                    >
                        Previous Juz
                    </Button>
                    <Button
                        className="w-full"
                        isDisabled={!nextJuz}
                        onClick={() => {
                            if (nextJuz) {
                                router.push(`/${url}/${nextJuz.juz_number}`);
                            }
                        }}
                    >
                        Next Juz
                    </Button>
                </div>
                <div className="my-4">
                    <Search />
                </div>
            </div>
        </div>
    );
};

export default JuzBanner;