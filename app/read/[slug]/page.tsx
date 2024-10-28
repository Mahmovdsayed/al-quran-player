import SectionBanner from "@/components/Layout/SectionBanner";
import SurahSection from "@/components/Sections/read/SurahSection";
import ImageBasmala from "@/components/UI/ImageBasmala";
import { getChapter } from "@/context/surahContext";
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

const Page = ({ params }: { params: { slug: string } }) => {
    const id = params.slug;
    return <>
        <main className="min-h-screen pt-0">
            <SectionBanner url="read" />
            <div className="container mx-auto">
                <Divider className='my-3' />
                <div>
                    <ImageBasmala num={id} />
                </div>
                <SurahSection url="read" surahID={id} />
            </div>

        </main >
    </>;
};

export default Page;