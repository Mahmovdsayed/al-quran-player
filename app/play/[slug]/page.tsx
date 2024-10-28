import { Metadata } from 'next';
import SectionBanner from '@/components/Layout/SectionBanner';
import { surah } from '@/static/surah';
import Plays from '@/components/Sections/play/Play';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';
import logo from '@/public/mainImage.webp'
import Filters from '@/components/Sections/play/Filters';
import AboutSurah from '@/components/Sections/info/AboutSurah';
import { getChapter } from '@/context/surahContext';


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

        };
    }
}


const Page = ({ params }: { params: { slug: string } }) => {
    const id = params.slug;


    return (
        <main className="min-h-screen pt-0">
            <SectionBanner url='play' />
            <div className="container mx-auto">
                <Divider className='my-3' />
                <Filters surahID={id} />
                <Plays surahID={id} />
            </div>
        </main >
    );
};

export default Page;
