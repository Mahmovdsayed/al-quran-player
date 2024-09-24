'use client'

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPause, FaPlay } from "react-icons/fa";
import Modals from "./Modal";
import { cleanText } from "@/functions/cleanText";
import CopyAyah from "./CopyAyah";
import { PiBookBookmarkDuotone } from "react-icons/pi";

interface IProps {
    ayah: any;
    ayahENn: any;
    sound: any;
    surahId: any;
    numberInSurah: any;
}

const AyahCard = ({ ayah, ayahENn, sound, surahId, numberInSurah }: IProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);

    useEffect(() => {
        if (audioSrc && isPlaying) {
            audioRef.current?.play();
        }
    }, [audioSrc]);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            if (!audioSrc) {
                setAudioSrc(`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${sound}.mp3`);
            } else {
                audioRef.current?.play();
            }
            setIsPlaying(true);
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    return (
        <Card isPressable className='my-2 p-4 bg-transparent w-full' radius="sm" shadow='none'>
            <CardHeader className='flex justify-between items-center'>
                <div>
                    <span className='font-bold text-default-500 text-sm'>{surahId} : {numberInSurah}</span>
                </div>
                <div className='flex items-center justify-center space-x-2'>
                    <Modals ayahAR={ayah} ayahEN={ayahENn} ayahKey={`${surahId} : ${numberInSurah}`} />
                    <Button
                        size='sm'
                        className='bg-transparent text-default-500 font-bold'
                        isIconOnly
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </Button>
                    <CopyAyah ayah={ayah} />
                </div>
            </CardHeader>
            <CardBody>
                <p className='flex justify-end text-2xl md:text-4xl items-end text-end leading-9 md:leading-[2] mb-3'>{ayah}</p>
                <p className='flex justify-start text-medium md:text-xl text-default-600 font-medium items-start text-start'>{cleanText(ayahENn || "")}</p>
                {audioSrc && (
                    <audio
                        ref={audioRef}
                        src={audioSrc}
                        style={{ display: 'none' }}
                        onEnded={handleAudioEnded}
                    />
                )}
            </CardBody>
        </Card>
    );
};

export default AyahCard;
