import SectionBanner from "@/components/Layout/SectionBanner";
import AboutSurah from "@/components/Sections/info/AboutSurah";
import { getChapter, getSurahInfo } from "@/context/surahContext";
import { Divider } from "@nextui-org/react";
import { Metadata } from "next";


export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const id = params.slug;
    try {
        const data = await getChapter(id);
        return {
            title: `Surah ${data?.name_simple} - سوره ${data?.name_arabic}`,
            description: `Discover Surah ${data?.name_simple} , the ${data?.id}th chapter of the Quran, revealed in ${data?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${data?.name_simple} and explore its profound meanings and messages.`,
            openGraph: {
                title: `Surah ${data?.name_simple} - سوره ${data?.name_arabic}`,
                description: `Discover Surah ${data?.name_simple} , the ${data?.id}th chapter of the Quran, revealed in ${data?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${data?.name_simple} and explore its profound meanings and messages.`,
            },
            twitter: {
                card: "summary_large_image",
                title: `Surah ${data?.name_simple} - سوره ${data?.name_arabic}`,
                description: `Discover Surah ${data?.name_simple} , the ${data?.id}th chapter of the Quran, revealed in ${data?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${data?.name_simple} and explore its profound meanings and messages.`,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        return {
            title: "Surah Not Found",
            description: "The requested Surah could not be found.",
            openGraph: {
                title: "Surah Not Found",
                description: "The requested Surah could not be found.",
            },
            twitter: {
                card: "summary_large_image",
                title: "Surah Not Found",
                description: "The requested Surah could not be found.",
            },
            robots: {
                index: false,
                follow: true,
            },
        };
    }
}

const Page = async ({ params }: { params: { slug: string } }) => {
    const id = params.slug;
    const data = await getSurahInfo(id)
    return <>
        <main className="min-h-screen pt-0">
            <SectionBanner url="info" />
            <div className="container mx-auto">
                <AboutSurah info={data} SurahId={id} />
            </div>
        </main>
    </>;
};

export default Page;