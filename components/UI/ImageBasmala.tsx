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
    const parsedNum = Number(num);

    // Check if num less than or equal 1, or greater than 114
    if (parsedNum <= 1 || parsedNum > 114) {
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
