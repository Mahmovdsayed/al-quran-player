'use client'

import LoadingScreen from "@/components/Layout/LoadingScreen";
import AyahCard from "@/components/UI/AyahCard";
import { surahDataTranslation } from "@/context/surahContext";
import { surah } from "@/static/surah";
import { AppDispatch, RootState } from "@/store";
import { fetchSurahData, selectSurah } from "@/store/slices/surahSlice";
import { Button, Divider, Link, ScrollShadow, Spinner } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
interface IProps {
    surahID: string
    url: string

}
const SurahSection = ({ surahID, url }: IProps) => {
    const [dataEn, setDataEn] = useState<any[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const { surahh, loading, error } = useSelector(selectSurah);

    const { slug } = useParams();
    const router = useRouter()
    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id + 1)
        : null;

    const enData = async () => {
        const data = await surahDataTranslation(surahID);
        setDataEn(data)
    }

    useEffect(() => {
        enData()
        dispatch(fetchSurahData(surahID));
    }, [dispatch]);

    if (loading) {
        return <div className="flex items-center justify-center"><Spinner /></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return <>
        <div className="">

            {surahh.map((verse: any, index) => <>
                <div key={verse.id}>
                    <AyahCard ayah={verse.text_imlaei} ayahENn={dataEn[index]?.text} numberInSurah={dataEn[index]?.verse_number} sound={verse.id} surahId={surahID} key={verse.id} />
                    <Divider />
                </div>
            </>
            )}
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
    </>;
};

export default SurahSection;