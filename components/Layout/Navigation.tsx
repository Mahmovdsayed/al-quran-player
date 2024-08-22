'use client'

import { surah } from "@/static/surah";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";

interface IProps {

}

const Navigation = ({ }: IProps) => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>(null);

    const removeDiacritics = (text: string): string => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const searchSurah = () => {
        const normalizedQuery = removeDiacritics(searchQuery.toLowerCase());
        console.log('Searching for:', normalizedQuery);

        const result = surah.find(surah =>
            removeDiacritics(surah.englishName.toLowerCase()) === normalizedQuery
        );

        if (result) {
            console.log('Search result:', result);
        } else {
            console.log('Surah not found');
        }

        setSearchResult(result || `Surah with name "${searchQuery}" not found.`);
    };

    return (
        <>
            <div className="">
                <Navbar isBordered>
                    <NavbarContent>

                        <NavbarBrand>
                            <p className="font-bold text-inherit uppercase">Quran Player</p>
                        </NavbarBrand>
                    </NavbarContent>

                </Navbar>
            </div>
            <div className="flex items-center justify-center w-full p-2">

                {/* <div className="flex items-center">
                    <Input
                        type="text"
                        placeholder="Search Quran..."
                        className="md:min-w-[600px] min-w-[350px] m-auto font-semibold"
                        value={searchQuery}
                        color="secondary"
                        description={"Search by English Name"}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                searchSurah();
                            }
                        }}
                    />
                </div> */}
            </div>

            <div className="p-4">
                {searchResult && typeof searchResult === 'string' ? (
                    <div className="text-red-500">{searchResult}</div>
                ) : searchResult ? (
                    <Card>
                        <CardBody>
                            <h2 className="text-xl font-bold">{searchResult.name} ({searchResult.englishName})</h2>
                            <p>Surah Number: {searchResult.number}</p>
                            <p>Number of Ayahs: {searchResult.numberOfAyahs}</p>
                        </CardBody>
                    </Card>
                ) : null}
            </div>
        </>
    );
};

export default Navigation;
