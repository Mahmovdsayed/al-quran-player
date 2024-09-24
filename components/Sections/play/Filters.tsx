'use client';

import Bread from "@/components/UI/Bread";
import { recitations } from "@/static/recitations";
import { surah } from "@/static/surah";
import { RootState } from "@/store";
import { setSelectedReciter } from "@/store/slices/reciterSlice";
import { Avatar, Button, Link, Select, SelectItem, Selection } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {
    surahID: any;
}

const Filters = ({ surahID }: IProps) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<Selection>(new Set([String(surahID)]));
    const [isLoading, setIsLoading] = useState(true);
    const selectedReciterId = useSelector((state: RootState) => state.reciter.selectedReciterId);

    const router = useRouter();

    // Handle Surah change
    const handleSurahChange = (selected: Selection) => {
        setValue(selected);
        const selectedSurahId = Array.from(selected)[0];
        router.push(`/play/${selectedSurahId}`);
    };

    // Handle Reciter change
    const handleReciterChange = (selected: Selection) => {
        const selectedReciterId = Array.from(selected)[0] as string; // Ensure it's a string
        dispatch(setSelectedReciter(selectedReciterId)); // Dispatch action to update Redux state
        // window.location.reload(); // Reload the page to apply the changes
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);



    return (
        <>
            <div className="my-4 flex flex-col md:flex-row justify-center items-center px-4 md:space-x-3">
                {/* Surah Select */}
                <Select
                    variant="flat"
                    size="md"
                    className="max-w-[400px] mb-3 md:mb-0"
                    selectedKeys={value}
                    onSelectionChange={handleSurahChange}
                    label="Select a Surah for Listening"
                    aria-label="Select a Surah for Listening"
                    labelPlacement="inside"
                    radius="sm"
                    showScrollIndicators
                    // isLoading={isLoading}
                >
                    {surah.map((su: any) => (
                        <SelectItem
                            className="z-50"
                            aria-label="Select a Surah for Listening"
                            startContent={`${su.id}`}
                            textValue={`Surah ${su.name_simple} - سوره ${su.name_arabic}`}
                            key={su.id}
                        >
                            Surah {su.name_simple} - سوره {su.name_arabic}
                        </SelectItem>
                    ))}
                </Select>

                {/* Reciter Select */}
                <Select
                    variant="flat"
                    size="md"
                    showScrollIndicators
                    radius="sm"
                    placeholder="Select Quran Reciters"
                    className="max-w-[400px]"
                    label="Select a Quran Reciter"
                    aria-label="Select a Quran Reciter"
                    labelPlacement="inside"
                    selectedKeys={new Set([selectedReciterId])}
                    onSelectionChange={handleReciterChange}
                    // isLoading={isLoading}
                >
                    {recitations.map((rec) => (
                        <SelectItem
                            className="z-50"
                            aria-label="Select  a Quran Reciter"
                            key={rec.identifier}
                            textValue={rec.englishName}
                        >
                            {rec.englishName}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </>
    );
};

export default Filters;
