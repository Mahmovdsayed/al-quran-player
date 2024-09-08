'use client'

import { surah } from "@/static/surah";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/MoonIcon";
import { useRouter } from "next/navigation";
import confetti from 'canvas-confetti';

interface IProps { }

const Navigation = ({ }: IProps) => {
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>(null);
    const router = useRouter();
    const buttonRef = useRef(null);

    let scalar = 5;
    const pineapple = confetti.shapeFromText({ text: '💙', scalar });

    const handleConfetti = () => {
        confetti({
            shapes: [pineapple],
            particleCount: 30,
            scalar,
            spread: 70,
            origin: { y: 0.6 },
        });
    };
    // const removeDiacritics = (text: string): string => {
    //     return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // };

    // const searchSurah = () => {
    //     const normalizedQuery = removeDiacritics(searchQuery.toLowerCase());
    //     console.log('Searching for:', normalizedQuery);

    //     let result = null;
    //     if (!isNaN(Number(normalizedQuery))) {
    //         // If the search query is a number, search by Surah number
    //         const surahNumber = Number(normalizedQuery);
    //         result = surah.find(surah => surah.number === surahNumber);
    //     } else {
    //         // If the search query is a text, search by English name
    //         result = surah.find(surah =>
    //             removeDiacritics(surah.englishName.toLowerCase()) === normalizedQuery
    //         );
    //     }

    //     if (result) {
    //         console.log('Search result:', result);
    //     } else {
    //         console.log('Surah not found');
    //     }

    //     setSearchResult(result || `Surah with name or number "${searchQuery}" not found.`);
    // };

    const handleCardClick = (surahNumber: number) => {
        // Hide the search result
        setSearchResult(null);
        // Navigate to the new page
        router.push(`/play/${surahNumber}`);
    };

    return (
        <>
            <div className="">
                <Navbar className="bg-gray-200 dark:bg-[#22213d]">
                    <NavbarBrand>
                        <p className="font-bold text-inherit uppercase">AL-Quran Player</p>
                    </NavbarBrand>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <div className="space-x-2">
                                <Button
                                    onClick={() => setTheme("light")}
                                    ref={buttonRef}
                                    onPress={handleConfetti}
                                    startContent={<SunIcon />}
                                    size="sm"
                                    isIconOnly
                                    color="default"
                                    radius="sm"
                                />
                                <Button
                                    onClick={() => setTheme("dark")}
                                    ref={buttonRef}
                                    onPress={handleConfetti}
                                    startContent={<MoonIcon />}
                                    size="sm"
                                    radius="sm"
                                    isIconOnly
                                    color="default"
                                />
                            </div>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>
            {/* <div className="flex items-center justify-center w-full p-2">
                <div className="flex items-center mt-4">
                    <Input
                        type="text"
                        placeholder="Search Quran..."
                        className="md:min-w-[600px] min-w-[350px]  m-auto font-semibold"
                        value={searchQuery}
                        description={"Search by Surah Number or English Name"}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                searchSurah();
                            }
                        }}
                    />
                </div>
            </div>
            <div className="">
                {searchResult && typeof searchResult === 'string' ? (
                    <div className="text-red-500">{searchResult}</div>
                ) : searchResult ? (
                    <div className="container mx-auto flex justify-center items-center p-4">
                        <Card
                            isPressable
                            onClick={() => handleCardClick(searchResult.number)}
                            className="bg-gray-200 dark:bg-[#181818] w-full"
                            shadow="none"
                        >
                            <CardBody>
                                <h2 className="text-xl font-bold">{searchResult.name} ({searchResult.englishName})</h2>
                                <p>Surah Number: {searchResult.number}</p>
                                <p>Number of Ayahs: {searchResult.numberOfAyahs}</p>
                            </CardBody>
                        </Card>
                    </div>
                ) : null}
            </div> */}
        </>
    );
};

export default Navigation;
