'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchSurahData, selectSurah } from '@/store/slices/surahSlice';
import { fetchSurahTranslationData, selectSurahTranslation } from '@/store/slices/surahTranslationSlice';
import { Button, Divider, Spinner } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import AyahCard from '@/components/UI/AyahCard';
import { surah } from '@/static/surah';

interface IProps {
    surahID: string;
    url: string;
}

const SurahSection = ({ surahID, url }: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { surahh, loading: surahLoading, error: surahError } = useSelector(selectSurah);
    const { translations, loading: translationLoading, error: translationError } = useSelector(selectSurahTranslation);

    const { slug } = useParams();
    const router = useRouter();
    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find(surahItem => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find(surahItem => surahItem.id === selectedSurah.id + 1)
        : null;

    useEffect(() => {
        if (surahID) {
            dispatch(fetchSurahData(surahID));
            dispatch(fetchSurahTranslationData(surahID));
        }
    }, [dispatch, surahID]);

    const parsedNum = Number(surahID);

    // Check if num is less than or equal to 0, or greater than 114
    if (parsedNum <= 0 || parsedNum > 114) {
        return null;
    }


    if (surahLoading || translationLoading) {
        return <div className="flex items-center justify-center"><Spinner /></div>;
    }

    if (surahError) {
        return <div>Error fetching surah data: {surahError}</div>;
    }

    if (translationError) {
        return <div>Error fetching translation data: {translationError}</div>;
    }

    return (
        <div className='px-0'>
            {surahh.map((verse, index) => (
                <div key={verse.id}>
                    <AyahCard
                        ayah={verse.text_imlaei}
                        ayahENn={translations[index]?.text}
                        numberInSurah={translations[index]?.verse_number}
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
