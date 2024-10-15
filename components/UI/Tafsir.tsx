'use client'
import { getTafsir } from "@/context/surahContext";
import { Tafsirs } from "@/static/tafsirs";
import { RootState } from "@/store";
import { Button, Divider, Select, SelectItem, Spinner, Tooltip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { PiBookBookmarkDuotone } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Drawer } from 'vaul';

interface IProps {
    verse_key: string;
    text: string;
}

const Tafsir = ({ verse_key, text }: IProps) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false)
    const getTafsirData = async () => {
        setLoading(true)
        const response = await getTafsir(verse_key);
        console.log(response)
        setData(response);
        setLoading(false)
    };

    useEffect(() => {
    }, [verse_key]);

    return (
        <div className="z-50">
            <Drawer.Root>
                <Drawer.Trigger asChild>
                    <Button onPress={getTafsirData} size="sm" isIconOnly>
                        <PiBookBookmarkDuotone size={15} />
                    </Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-gray-200 dark:bg-[#262626] flex flex-col rounded-t-[20px] h-full mt-24 max-h-[80%] fixed bottom-0 left-0 right-0">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 dark:bg-[#424242] my-5" />
                        <div className="p-4 bg-white dark:bg-[#181818] w-full mx-auto flex flex-col overflow-auto rounded-t-[30px] ">
                            <div className="max-w-xl mx-auto">
                                <Drawer.Title className="text-end text-xl text-default-500 my-4 font-bold">
                                    {text}
                                </Drawer.Title>
                                <Divider />
                                {
                                    loading ? <div className="flex items-center justify-center my-4">
                                        <Spinner />
                                    </div> :
                                        <div className="mb-2 leading-10 text-2xl  w-full text-start font-medium">
                                            {data.map((tafsir: any) => {
                                                const matchingTafsir = Tafsirs.find(t => t.id === tafsir.resource_id);

                                                if (matchingTafsir) {
                                                    return (
                                                        <div className={`my-3`} key={tafsir.resource_id}>
                                                            <h3 className="font-bold mb-3 text-medium">
                                                                {matchingTafsir.translated_name.name} ({matchingTafsir.language_name})
                                                            </h3>
                                                            <div className={matchingTafsir.language_name === "arabic" ? "text-end text-medium mb-3 text opacity-80" : "text-start text-medium mb-3 opacity-80"} dangerouslySetInnerHTML={{ __html: tafsir.text }} />
                                                            <Divider />
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>

                                }

                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    );
};

export default Tafsir;
