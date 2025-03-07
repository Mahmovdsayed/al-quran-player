import JuzSurahSection from "@/components/Sections/JuzSurahSection";
import JuzBanner from "@/components/UI/JuzBanner";
import { getJuzData } from "@/context/surahContext";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const juzNumber = params.slug;
    try {
        const juzName = `JUZ ${juzNumber} - AL QURAN PLAYER`;

        return {
            title: `${juzName}`,
            description: `Explore ${juzName} of the Quran. This Juz contains portions of various Surahs, each with profound meanings and messages. Dive into the recitation and understanding of this Juz.`,
            openGraph: {
                title: `${juzName}`,
                description: `Explore ${juzName} of the Quran. This Juz contains portions of various Surahs, each with profound meanings and messages. Dive into the recitation and understanding of this Juz.`,
            },
            twitter: {
                card: "summary_large_image",
                title: `${juzName}`,
                description: `Explore ${juzName} of the Quran. This Juz contains portions of various Surahs, each with profound meanings and messages. Dive into the recitation and understanding of this Juz.`,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        return {
            title: "Juz Not Found",
            description: "The requested Juz could not be found.",
            openGraph: {
                title: "Juz Not Found",
                description: "The requested Juz could not be found.",
            },
            twitter: {
                card: "summary_large_image",
                title: "Juz Not Found",
                description: "The requested Juz could not be found.",
            },
            robots: {
                index: false,
                follow: true,
            },
        };
    }
}

const page = async ({ params }: { params: { slug: string } }) => {
    const data = await getJuzData(params.slug);

    const surahsMap: { [key: string]: any[] } = {};
    data?.data?.ayahs?.forEach((ayah: any) => {
        const surahName = ayah.surah.englishName + " - " + ayah.surah.name;
        if (!surahsMap[surahName]) {
            surahsMap[surahName] = [];
        }
        surahsMap[surahName].push(ayah);
    });

    return (
        <main className="min-h-screen pt-0">
            <JuzBanner url="juz" />
            <div className="container mx-auto">
            </div>
            <div className="container mx-auto py-6">
                {Object.entries(surahsMap).map(([surahName, ayahs]) => (
                    <JuzSurahSection key={surahName} surahName={surahName} ayahs={ayahs} />
                ))}
            </div>

        </main>
    );
};

export default page;