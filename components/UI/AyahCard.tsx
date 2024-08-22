'use client'

import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaBookOpen, FaPause, FaPlay } from "react-icons/fa";

interface IProps {
    ayah: string;
    ayahENn: string;
    surahId: string;
    sound: string;
    numberInSurah: string;
}

const AyahCard = ({ ayah, ayahENn, surahId, sound, numberInSurah }: IProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    const ayahText = surahId !== "1" && numberInSurah == "1" ? ayah.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '') : ayah;

    return (
        <Card isPressable className='my-4 p-4 bg-gray-200 w-full' shadow='none'>
            <CardHeader className='flex justify-between items-center'>
                <div>
                    <span className='font-bold text-default-500 text-sm'>{surahId} : {numberInSurah}</span>
                </div>
                <div className='flex items-center justify-center space-x-2'>
                    <Button size='sm' className='bg-transparent text-default-500 font-bold' isIconOnly>
                        <FaBookOpen />
                    </Button>
                    <Button
                        size='sm'
                        className='bg-transparent text-default-500 font-bold'
                        isIconOnly
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <FaPause /> : <FaPlay />}
                    </Button>
                    <Button size='sm' className='bg-transparent text-default-500 font-bold' isIconOnly>
                        <BsThreeDots />
                    </Button>
                </div>
            </CardHeader>
            <CardBody>
                <span contentEditable="false" className='flex justify-end text-xl md:text-4xl items-end text-end leading-9 mb-3'>{ayahText}</span>
                <span contentEditable="false" className='flex justify-start text-sm md:text-2xl items-start text-start'>{ayahENn}</span>
                <audio
                    ref={audioRef}
                    src={sound}
                    style={{ display: 'none' }}
                    onEnded={handleAudioEnded}
                />
            </CardBody>
        </Card>
    );
};

export default AyahCard;
