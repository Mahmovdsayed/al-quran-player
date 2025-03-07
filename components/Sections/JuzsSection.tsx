'use client'

import { handleClick } from "@/functions/copyURL";
import { juzs } from "@/static/juzs";
import { surah } from "@/static/surah";
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaReadme } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

type Surah = {
    id: number;
    name_arabic: string;
    name_simple: string;
    verses_count: number;
};

const JuzsSection = () => {
    const router = useRouter()
    return (
        <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {juzs.map((juz: any, index: number) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 / 2 }}
                        key={juz.juz_number}>
                        <Card shadow="none" className="bg-gray-200 dark:bg-[#181818] h-full" key={juz.juz_number} radius="sm">
                            <CardHeader className="flex flex-col gap-2 items-start justify-start">
                                <div className="font-bold text-lg">
                                    Juz {juz.juz_number}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Total Surahs: {Object.keys(juz.verse_mapping).length}
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="space-y-2">
                                    {Object.entries(juz.verse_mapping).map(([surahId, verses]) => {
                                        const surahInfo: Surah | undefined = surah.find((s) => s.id === parseInt(surahId));
                                        if (!surahInfo) {
                                            console.warn(`Surah with ID ${surahId} not found.`);
                                            return null;
                                        }
                                        return (
                                            <div key={surahId} className="flex justify-between">
                                                <p onClick={() => router.push(`/read/${surahInfo.id}`)} className="text-sm md:text-base underline cursor-pointer font-semibold">{surahInfo.name_simple}</p>
                                                <Chip
                                                    size="sm"
                                                    radius="sm"
                                                    variant="flat"
                                                    color="primary"
                                                >{verses as string}</Chip>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardBody>
                            <Divider />
                            <CardFooter className="flex flex-col items-center justify-between gap-2">
                                <Button onPress={() => router.push(`juz/${juz.juz_number}`)} size="sm" radius="sm" startContent={<FaReadme />} className="w-full text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-blue-500">Read Juz</Button>
                                <Button size="sm" radius="sm" onPress={() => handleClick(`juz/${juz.juz_number}`)} startContent={<IoShareSocial />} className="w-full ">Share</Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default JuzsSection;