'use client'
interface IProps {
    ayah: any,
}
import { CopyDocumentIcon } from "@/icons/CopyIcon";
import { Button } from "@nextui-org/react";
import { toast } from "sonner";
const CopyAyah = ({ ayah }: IProps) => {

    const handleClick = (text: string) => {
        try {
            const input = document.createElement("input");
            input.style.position = "fixed";
            input.style.opacity = "0";
            input.value = text;
            document.body.appendChild(input);
            input.focus();
            input.select();
            const result = document.execCommand("copy");
            document.body.removeChild(input);
            if (result) {
                toast.success("Ayah copied to clipboard!");
            } else {
                throw new Error("Failed to copy using fallback method.");
            }
        } catch (err) {
            console.error("Failed to copy using fallback method:", err);
            toast.error("Failed to copy Ayah to clipboard!");
        }

    };

    return <>
        <Button onClick={() => handleClick(ayah)} size='sm'  isIconOnly>
            <CopyDocumentIcon />
        </Button>
    </>;
};

export default CopyAyah;