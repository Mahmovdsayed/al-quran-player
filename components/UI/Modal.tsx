'use client';
import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalProps } from "@nextui-org/modal";
import { Button, Divider, Input } from "@nextui-org/react";
import { IoMdShare } from "react-icons/io";
import { cleanText } from "@/functions/cleanText";
import html2canvas from "html2canvas";

interface IProps {
    ayahAR: string;
    ayahEN: string;
    ayahKey: any;
}

const Modals = ({ ayahAR, ayahEN, ayahKey }: IProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

    const [isLoading, setIsLoading] = useState(false);

    const [bgColor, setBgColor] = useState("#FFFFFF");
    const [textColor, setTextColor] = useState("#6F4E37");
    const [showAyahAR, setShowAyahAR] = useState(true);
    const [showAyahEN, setShowAyahEN] = useState(true);
    const [showAyahKey, setShowAyahKey] = useState(true);

    const divRef = useRef<HTMLDivElement>(null);

    const handleOpen = () => {
        onOpen();
    };


    const downloadImage = async () => {
        setIsLoading(true);
        if (divRef.current) {
            try {
                const canvas = await html2canvas(divRef.current);
                const dataUrl = canvas.toDataURL("image/jpg");
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `ayah-card-${ayahKey}.jpg`;
                link.click();
            } catch (error) {
                console.error("Error downloading image:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <Button onClick={handleOpen} size="sm" className="bg-transparent text-default-500 font-bold" isIconOnly>
                <IoMdShare size={15} />
            </Button>

            <Modal
                backdrop={"opaque"}
                isOpen={isOpen}
                className="mx-3"
                onClose={onClose}
                placement="top-center"
                size="3xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Share Ayah Card</ModalHeader>
                            <Divider />
                            <ModalBody className="flex flex-row">

                                <Input
                                    type="color"
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    size="sm"
                                    description="Background Color"
                                    className="w-full"
                                />
                                <Input
                                    type="color"
                                    value={textColor}
                                    onChange={(e) => setTextColor(e.target.value)}
                                    size="sm"
                                    description="Text Color"
                                    className="w-full"
                                />
                            </ModalBody>
                            <ModalBody className="py-3">
                                <div className="grid grid-cols-3 gap-2">
                                    {/* <Button className="w-full" onPress={() => setBgColor("#FFFFFF")}>White BG</Button>
                                    <Button className="w-full" onPress={() => setBgColor("#F5F5DC")}>Beige BG</Button>
                                    <Button className="w-full" onPress={() => setTextColor("#6F4E37")}>Brown Text</Button>
                                    <Button className="w-full" onPress={() => setTextColor("#fff")}>White Text</Button>
                                    <Button className="w-full" onPress={() => setTextColor("#000000")}>Black Text</Button> */}
                                    <Button className="w-full" onPress={() => setShowAyahAR(!showAyahAR)}>{showAyahAR ? "Hide" : "Show"} Arabic</Button>
                                    <Button className="w-full" onPress={() => setShowAyahEN(!showAyahEN)}>{showAyahEN ? "Hide" : "Show"} English</Button>
                                    <Button className="w-full" onPress={() => setShowAyahKey(!showAyahKey)}>{showAyahKey ? "Hide" : "Show"} Ayah Key</Button>
                                </div>
                            </ModalBody>
                            <ModalBody className="justify-center my-4 items-center">



                                <div
                                    ref={divRef}
                                    className="h-[350px] overflow-hidden w-[350px] flex items-center justify-center flex-col px-4 py-10 text-center"
                                    style={{ backgroundColor: bgColor, color: textColor }}
                                >
                                    {showAyahAR && <h3 className="text-sm font-bold ">{ayahAR}</h3>}
                                    {showAyahEN && <p className="mt-2 text-tiny  opacity-75 font-medium">{cleanText(ayahEN || "")}</p>}
                                    {showAyahKey && <span className="text-tiny mt-3 opacity-75 font-bold font-sans">{ayahKey}</span>}
                                </div>
                            </ModalBody>

                            <Divider />
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={isLoading} color="primary" onPress={downloadImage}>
                                    Download Image
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default Modals;
