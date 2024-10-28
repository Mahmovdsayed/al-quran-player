'use client'
import { useEffect, useRef, useState } from "react";
import { Button, Card, Spinner, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { FaBackward, FaForward, FaPause, FaPlay, FaDownload } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { surah } from "@/static/surah";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { downloadFile } from "@/functions/downloadFile";

interface IProps {
    surahID: any
}

const Play = ({ surahID }: IProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { slug } = useParams();
    const router = useRouter();

    const selectedSurah = surah.find(surahItem => surahItem.id.toString() === slug);
    const previousSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id - 1)
        : null;
    const nextSurah = selectedSurah
        ? surah.find((surahItem) => surahItem.id === selectedSurah.id + 1)
        : null;
    const selectedReciterId = useSelector((state: RootState) => state.reciter.selectedReciterId);

    useEffect(() => {
        const audio = new Audio(`https://cdn.islamic.network/quran/audio-surah/128/${selectedReciterId}/${surahID}.mp3`);
        audioRef.current = audio;

        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: selectedSurah?.name_simple || 'Surah',
                artist: selectedReciterId || 'NEST',
                album: selectedSurah?.name_arabic || 'Quran',
                artwork: [
                    { src: 'https://res.cloudinary.com/dxvpvtcbg/image/upload/v1718408970/tmmomilgpfuexrqjpynr.svg', sizes: '512x512', type: 'image/jpeg' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => {
                audio.play();
                setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                audio.pause();
                setIsPlaying(false);
            });
        }

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoading(false);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleError = () => {
            setError('Failed to load audio file');
            setIsLoading(false);
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("error", handleError);

        return () => {
            audio.pause();
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("error", handleError);
        };
    }, [surahID, selectedReciterId]);

    const togglePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const skipForward = () => {
        if (previousSurah) {
            router.push(`/play/${previousSurah.id}`);
        }
    };

    const skipBackward = () => {
        if (nextSurah) {
            router.push(`/play/${nextSurah.id}`);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handleDownload = () => {
        const url = `https://cdn.islamic.network/quran/audio-surah/128/${selectedReciterId}/${surahID}.mp3`;
        downloadFile(url, "mp3");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full my-4">
                <span><Spinner /></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 px-4 mx-auto my-6">
            <Card shadow="none" className="bg-gray-200 dark:bg-[#181818]">
                <CardHeader className="p-0">
                    <div className="w-full text-white flex-col space-y-1 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-fuchsia-600 to-pink-600 h-[100px] flex items-center justify-center ">
                        <h4 className="text-xl">{`${selectedSurah?.name_simple} - ${selectedSurah?.name_arabic}`}</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="flex-1 mx-4">
                        <input
                            color="default"
                            type="range"
                            className="w-full bg-none bg-transparent"
                            value={currentTime}
                            max={duration}
                            onChange={(e) => {
                                if (audioRef.current) {
                                    audioRef.current.currentTime = parseFloat(e.target.value);
                                }
                            }}
                        />
                        <div className="flex items-center justify-center font-medium text-default-500">
                            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
                        </div>
                    </div>
                </CardBody>
                <Divider />
                <CardFooter className="flex items-center justify-center">
                    <div className="space-x-4">
                        <Button size="sm" isDisabled={!previousSurah} onClick={skipForward}>
                            <FaBackward />
                        </Button>
                        <Button size="sm" className="text-white bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-pink-500 via-purple-500 to-blue-500" onClick={togglePlayPause}>
                            {isPlaying ? <FaPause /> : <FaPlay />}
                        </Button>
                        <Button size="sm" isDisabled={!nextSurah} onClick={skipBackward}>
                            <FaForward />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Play;
