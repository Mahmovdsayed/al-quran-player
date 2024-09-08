'use client'

import { useTheme } from "next-themes";
import Image from "next/image";
import mainImageDark from "@/public/Basmala-dark.svg"
import mainImageLight from "@/public/Basmala.svg"

interface IProps {
    num: string
}

const ImageBasmala = ({ num }: IProps) => {
    const { theme, setTheme } = useTheme();
    console.log(num)
    // Check if num is 1, and return null to hide the image
    if (num === "1") {
        return null;
    }

    return (
        <Image
            alt='Basmala'
            className='w-[350px] m-auto h-full my-4'
            src={theme === "dark" ? mainImageDark : mainImageLight}
        />
    );
};

export default ImageBasmala;
