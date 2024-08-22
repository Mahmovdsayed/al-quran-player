'use client'
import { Button, Input } from "@nextui-org/react";
import { FaBackward, FaForward, FaPause, FaVolumeUp } from "react-icons/fa";

interface IProps {

}
const Footer = ({ }: IProps) => {
    return <>
        <div className="flex items-center bottom-0 sticky justify-between p-4 border-t bg-red-400/30 backdrop-blur-md backdrop-filter lg:w-[70%] shadow-lg m-auto rounded-t-xl">
            <div className="flex items-center space-x-4">
                <Button size="sm" isIconOnly className="">
                    <FaBackward />
                </Button>
                <Button size="sm" isIconOnly className="">
                    <FaPause />
                </Button>
                <Button size="sm" isIconOnly className="">
                    <FaForward />
                </Button>
            </div>
            <div className="flex-1 mx-4">
                <input color="#000" type="range" className="w-full bg-none bg-transparent" />
            </div>

            <div className="flex items-center space-x-4">
                <FaVolumeUp className="text-gray-500" />
                <input  type="range" className="w-24" />
            </div>
        </div>
    </>;
};

export default Footer;