import { Divider } from "@nextui-org/react";
import AyahCard from "../UI/AyahCard";

interface IProps {
    surahName: string;
    ayahs: any[];
}
const JuzSurahSection = ({ surahName, ayahs }: IProps) => {
    return <>
        <div className="mb-8">
            <Divider className="my-4" />
            <h2 className="text-2xl font-bold text-center mb-4">{surahName}</h2>
            <Divider className="my-4" />
            <div className="space-y-4">
                {ayahs.map((ayah) => <>
                    <AyahCard
                        key={ayah.numberInSurah}
                        ayah={ayah.text}
                        ayahENn={""}
                        numberInSurah={ayah.numberInSurah}
                        sound={ayah.number}
                        surahId={ayah.surah.number}
                    />
                    <Divider />
                </>
                )}
            </div>
        </div>
    </>;
};

export default JuzSurahSection;