'use client'

import { azkarSabah } from "@/static/azkarSabah";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import AzkarCard from "../UI/AzkarCard";
import { azkarMassa } from "@/static/azkarMassa";
import { postPrayerAzkar } from "@/static/postPrayerAzkar";
import { motion } from "framer-motion";
import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/MoonIcon";
import { GiPrayerBeads } from "react-icons/gi";

interface IProps {

}

const AzkarSection = ({ }: IProps) => {
    return <>
        <div className="flex w-full flex-col justify-center items-center my-5">
            <Tabs
                size="sm"
                color="primary"
                variant="solid"
                aria-label="Options"
            >
                <Tab
                    key="azkarSabah"
                    title={
                        <div
                            className="flex items-center space-x-2">
                            <span>{azkarSabah.title}</span>
                            <SunIcon />
                        </div>
                    }
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 gap-4">
                        {azkarSabah.content.map((azkar: any, index: number) =>
                            <AzkarCard key={azkar.index} zekr={azkar.zekr} repeat={azkar.repeat} bless={azkar.bless} />
                        )}

                    </motion.div>
                </Tab>
                <Tab
                    key="azkarMessa"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>{azkarMassa.title}</span>
                            <MoonIcon />
                        </div>
                    }
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 gap-4">
                        {azkarMassa.content.map((azkar: any, index: number) =>
                            <AzkarCard key={azkar.index} zekr={azkar.zekr} repeat={azkar.repeat} bless={azkar.bless} />
                        )}

                    </motion.div>
                </Tab>
                <Tab
                    key="azkarPost"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>{postPrayerAzkar.title}</span>
                            <GiPrayerBeads />
                        </div>
                    }
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 gap-4">
                        {postPrayerAzkar.content.map((azkar: any, index: number) =>
                            <AzkarCard key={azkar.index} zekr={azkar.zekr} repeat={azkar.repeat} bless={azkar.bless} />
                        )}

                    </motion.div>
                </Tab>
            </Tabs>
        </div>
    </>;
};

export default AzkarSection;