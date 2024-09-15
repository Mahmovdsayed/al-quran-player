'use client'
interface IProps {

}
import { handleClick } from "@/functions/copyURL";
import { surah } from "@/static/surah";
import { Tabs, Tab, Chip, Card, CardHeader, CardFooter, Button, Link, Divider, CardBody, Image } from "@nextui-org/react";
import { FaBookOpen, FaPlay, FaQuran, FaReadme } from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";
import { IoShareSocial } from "react-icons/io5";
import PageRange from "../UI/PageRange";
import Prayer from "./Prayer";
import { FaNfcDirectional } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CgNotes } from "react-icons/cg";
import AzkarSection from "./AzkarSection";

const Home = ({ }: IProps) => {
    const router = useRouter()
    return <>
        <div className="flex flex-col w-full">
            <Tabs
                aria-label="Options"
                className="flex items-center mb-3  justify-center w-full"
                color="primary"
                size="lg"
                variant="underlined"
                classNames={{
                    tabList: "gap-4 relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                }}
            >
                <Tab
                    key="surah"
                    title={
                        <div className="flex items-center space-x-2">
                            <FaQuran />
                            <span>Surah</span>
                            <Chip size="sm" variant="faded">114</Chip>
                        </div>
                    }

                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 w-full gap-4">
                        {surah.map((su, index) =>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 / 2 }}
                                key={su.id}>
                                <Card shadow="none" className="w-full bg-gray-200 dark:bg-[#181818]">
                                    <CardHeader className="block">
                                        <div className="flex justify-between items-center">
                                            <Chip size="sm" radius="sm" color="primary" className="mb-2 text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-blue-500">{su.revelation_place}</Chip>
                                            <Chip size="sm" radius="sm" className="mb-2 text-tiny text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-blue-500">{su.verses_count} Ayahs</Chip>
                                        </div>
                                        <p className="font-medium text-xl">
                                            <sup className="text-default-500 font-bold text-tiny md:text-sm">{su.id}</sup> {su.name_simple} - {su.name_arabic}
                                        </p>
                                        <p className="text-default-500">{su.translated_name.name}</p>
                                        <PageRange pages={su.pages} />
                                    </CardHeader>

                                    <Divider />

                                    <CardFooter className="flex items-center justify-center gap-4">
                                        <Button startContent={<FaReadme />} color="default" onClick={() => router.push(`/read/${su.id}`)} className="w-full">Read</Button>
                                        <Button onClick={() => router.push(`/play/${su.id}`)} startContent={<FaPlay />} color="primary" className="w-full text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-blue-500">Play</Button>
                                        <Button onPress={() => handleClick(`play/${su.id}`)} startContent={<IoShareSocial />} className="w-full ">Share</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>

                        )}
                    </div>
                </Tab>
                <Tab
                    key="prayer"
                    title={
                        <div className="flex items-center space-x-2">
                            <GiPrayerBeads />
                            <span>Prayer Times</span>
                            <Chip size="sm" variant="faded">5</Chip>
                        </div>
                    }
                >
                    <Prayer />
                </Tab>
                <Tab
                    key="azkar"
                    title={
                        <div className="flex items-center space-x-2">
                            <CgNotes />
                            <span>Azkar</span>
                            <Chip size="sm" variant="faded">3</Chip>
                        </div>
                    }
                >
                    <div className="w-full">
                        <AzkarSection />
                    </div>
                </Tab>
            </Tabs>
        </div>
    </>;
};

export default Home;