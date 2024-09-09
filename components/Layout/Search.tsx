'use client'

import { surah } from "@/static/surah";
import { Card, CardBody, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

interface IProps {

}
const Search = ({ }: IProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>(null);
    const router = useRouter();
    const handleCardClick = (surahNumber: number) => {
        setSearchResult(null);
        router.push(`/read/${surahNumber}`);
    };
    const removeDiacritics = (text: string): string => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };


    const searchSurah = () => {
        const normalizedQuery = removeDiacritics(searchQuery.toLowerCase());
        console.log('Searching for:', normalizedQuery);

        let result = null;

        if (!isNaN(Number(normalizedQuery))) {

            const surahNumber = Number(normalizedQuery);
            result = surah.find(surah => surah.id === surahNumber);

        } else {

            result = surah.find(surah =>
                removeDiacritics(surah.name_arabic.toLowerCase()) === normalizedQuery ||
                removeDiacritics(surah.name_simple.toLowerCase()) === normalizedQuery
            );

        }

        if (result) {
            console.log('Search result:', result);
        } else {
            console.log('Surah not found');
        }

        setSearchResult(result || `Surah with name or number "${searchQuery}" not found.`);
    };
    return <>
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center">
                <Input
                    type="text"
                    placeholder="Search Quran..."
                    className="md:min-w-[600px] min-w-[350px]  m-auto font-semibold"
                    size="sm"
                    radius="full"
                    startContent={<BsSearch />}
                    value={searchQuery}
                    description={"🔍 Search by Surah Number or Name (Arabic or English). Just type the name directly, no need to prefix with 'Surah'."}
                    onChange={(e: any) => setSearchQuery(e.target.value)}
                    onKeyPress={(e: any) => {
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
                        onClick={() => handleCardClick(searchResult.id)}
                        className="bg-gray-200 dark:bg-[#181818] w-full"
                        shadow="none"
                    >
                        <CardBody>
                            <h2 className="text-xl font-bold">{searchResult.name_arabic} ({searchResult.name_simple})</h2>
                            <p>Surah Number: {searchResult.id}</p>
                        </CardBody>
                    </Card>
                </div>
            ) : null}
        </div>
    </>;
};

export default Search;