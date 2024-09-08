'use client'

import { surahData } from "@/context/surahContext";

interface IProps {
    surahID: string
}
const SurahSection = ({ surahID }: IProps) => {
    return <>
        {/* <div className="flex justify-center items-center mb-6">
            <Bread name={data?.englishName} />
        {ayahs.length && ayahsEN.length ? (
            ayahs.map((ayah: any, index: number) => (
                <AyahCard
                    sound={ayah.audio}
                    numberInSurah={ayah.numberInSurah}
                    key={index}
                    ayah={ayah.text}
                    ayahENn={ayahsEN[index].text}
                    surahId={id}
                />

            ))

        ) : (
            <p className="text-center text-lg">Loading...</p>
        )} */}
    </>;
};

export default SurahSection;