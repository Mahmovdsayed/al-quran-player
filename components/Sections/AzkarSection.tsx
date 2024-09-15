'use client'

import { azkarSabah } from "@/static/azkarSabah";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import AzkarCard from "../UI/AzkarCard";
import { azkarMassa } from "@/static/azkarMassa";
import { postPrayerAzkar } from "@/static/postPrayerAzkar";

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
                        <div className="flex items-center space-x-2">
                            <span>{azkarSabah.title}</span>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 gap-4">
                        {azkarSabah.content.map((azkar: any, index: number) =>
                            <AzkarCard key={azkar.index} zekr={azkar.zekr} repeat={azkar.repeat} bless={azkar.bless} />
                        )}

                    </div>
                </Tab>
                <Tab
                    key="azkarMessa"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>{azkarMassa.title}</span>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 gap-4">
                        {azkarMassa.content.map((azkar: any, index: number) =>
                            <AzkarCard key={azkar.index} zekr={azkar.zekr} repeat={azkar.repeat} bless={azkar.bless} />
                        )}

                    </div>
                </Tab>
                <Tab
                    key="azkarPost"
                    title={
                        <div className="flex items-center space-x-2">
                            <span>{postPrayerAzkar.title}</span>
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 gap-4">
                        {postPrayerAzkar.content.map((azkar: any, index: number) =>
                            <AzkarCard key={azkar.index} zekr={azkar.zekr} repeat={azkar.repeat} bless={azkar.bless} />
                        )}

                    </div>
                </Tab>
            </Tabs>
        </div>
    </>;
};

export default AzkarSection;