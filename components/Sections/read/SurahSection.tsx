'use client';

import { useQuery } from 'react-query';
import { Button, Divider, Spinner } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import AyahCard from '@/components/UI/AyahCard';
import { surah } from '@/static/surah';
import { surahDataTranslation, surahData } from '@/context/surahContext';


interface IProps {
    surahID: string;
    url: string;
}

const SurahSection = ({ surahID, url }: IProps) => {
    const { slug } = useParams();
    const router = useRouter();
    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find(surahItem => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find(surahItem => surahItem.id === selectedSurah.id + 1)
        : null;

    // Fetch surah data using react-query
    const { data: surahDataa, isLoading: surahLoading, isError: surahError } = useQuery({
        queryFn: async () => await surahData(surahID),
        queryKey: ['surah', surahID],
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    });

    const { data: translationData, isLoading: translationLoading, isError: translationError } = useQuery({
        queryFn: async () => await surahDataTranslation(surahID),
        queryKey: ['surahTranslation', surahID],
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 60,
        refetchIntervalInBackground: true,
    });
    console.log(surahDataa)
    console.log(translationData)
    const parsedNum = Number(surahID);

    if (parsedNum <= 0 || parsedNum > 114) {
        return null;
    }

    if (surahLoading || translationLoading) {
        return <div className="flex items-center justify-center"><Spinner /></div>;
    }

    if (surahError || translationError) {
        return <div>Error fetching surah data</div>;
    }


    return (
        <div className='px-2'>
            {surahDataa.verses?.map((verse: any, index: number) => (
                <div key={verse.id}>
                    <AyahCard
                        ayah={verse.text_imlaei}
                        ayahENn={translationData.translations[index]?.text}
                        numberInSurah={translationData.translations[index]?.verse_number}
                        sound={verse.id}
                        surahId={surahID}
                    />
                    <Divider className='my-4' />
                </div>
            ))}
            <div className="flex justify-center space-x-2 items-center my-4">
                <Button
                    isDisabled={!previousSurah}
                    startContent={<GrLinkPrevious />}
                    onClick={() => {
                        if (previousSurah) {
                            router.push(`/${url}/${previousSurah.id}`);
                        }
                    }}
                >
                    Previous Surah
                </Button>
                <Button
                    isDisabled={!nextSurah}
                    startContent={<GrLinkNext />}
                    onClick={() => {
                        if (nextSurah) {
                            router.push(`/${url}/${nextSurah.id}`);
                        }
                    }}
                >
                    Next Surah
                </Button>
            </div>
        </div>
    );
};

export default SurahSection;
