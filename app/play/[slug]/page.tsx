import { Metadata } from 'next';
import { api } from '@/utils/axios';
import { fetchSurahData } from '@/utils/fetchSurahData';
import AyahCard from '@/components/UI/AyahCard';

interface Ayah {
    text: string;
}
interface Data {
    data: any;
}
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const id = params.slug;
    try {
        const response = await fetchSurahData(id);
        const data = response;

        return {
            title: `${data.englishName} - ${data.name}`,
            description: `Discover Surah ${data.englishName} (${data.name}), the ${data.number}th chapter of the Quran.`,
            openGraph: {
                title: `${data.englishName} - ${data.name}`,
                description: `Discover Surah ${data.englishName} (${data.name}), the ${data.number}th chapter of the Quran.`,
            },
            twitter: {
                card: "summary_large_image",
                title: `${data.englishName} - ${data.name}`,
                description: `Discover Surah ${data.englishName} (${data.name}), the ${data.number}th chapter of the Quran.`,
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

const Page = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const id = params.slug;
    let ayahs: Ayah[] = [];
    let ayahsEN: Ayah[] = [];
    let error: string | undefined;

    try {
        const response = await api.get(`surah/${id}/ar.alafasy`);
        ayahs = response.data?.data.ayahs || [];
    } catch (err) {
        error = 'Failed to fetch data.';
    }
    try {
        const response = await api.get(`surah/${id}/en.asad`);
        ayahsEN = response.data?.data.ayahs || [];
    } catch (err) {
        error = 'Failed to fetch data.';
    }
    const response = await fetchSurahData(id);
    const data = response;
    return (
        <main className='min-h-screen rounded-t-[50px] pt-0'>
            <div className='container mx-auto p-4'>
                <h1 className='text-center font-bold text-4xl'>{data?.name}</h1>
                <p className='text-center font-medium text-default-600 text-medium my-3'>{`السورة رقم ${data.number} من القرآن الكريم. هذه السورة ${data.revelationType === 'Meccan' ? 'مكية' : 'مدنية'} وتحتوي على ${data.numberOfAyahs} آية`}</p>
                <div className='flex items-center justify-center'>
                    <audio controls src={`https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${data?.number}.mp3`} />
                </div>
                {error ? (
                    <p>{error}</p>
                ) : (
                    ayahs.map((ayah: any, index) => (
                        <AyahCard sound={ayah.audio} numberInSurah={ayah.numberInSurah} key={index} ayah={ayah.text} ayahENn={ayahsEN[index].text} surahId={id} />
                    ))
                )}
            </div>
        </main>
    );
};

export default Page;
