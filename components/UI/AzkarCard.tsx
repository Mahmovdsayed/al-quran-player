'use client';

import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { useState } from "react";

interface IProps {
    zekr: string;
    repeat: number;
    bless: string;
}

const AzkarCard = ({ zekr, repeat, bless }: IProps) => {
    const [remainingRepeats, setRemainingRepeats] = useState(repeat);

    const handleCardClick = () => {
        if (remainingRepeats > 0) {
            setRemainingRepeats(prev => prev - 1);
        }
    };

    const handleReset = () => {
        setRemainingRepeats(repeat);
    };

    return (
        <>
            <Card
                isPressable
                className="bg-gray-200 dark:bg-[#181818]"
                shadow="none"
                onPress={handleCardClick}
            >
                <CardHeader className="py-10 bg-content2 min-h-[100px]">
                    <div className="flex justify-center text-white w-full items-center flex-col px-4">
                        <span>Repetitions left: {remainingRepeats}</span>
                        <p className="text-sm   mt-1">
                            Tap the card each time you read to track how many repetitions are left.
                        </p>
                        <Button
                            className="mt-3"
                            size="sm"
                            radius="sm"
                            color="default"
                            variant="shadow"
                            onPress={handleReset}
                        >
                            Start Over
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="text-end">
                    <p contentEditable="false" className='flex justify-end text-2xl md:text-4xl items-end text-end leading-9 md:leading-[2] mb-3'>{zekr}</p>
                    <Divider />
                    <p contentEditable="false" className='flex mt-3 justify-end text-medium md:text-xl text-default-600 font-medium items-end text-end'>{bless}</p>
                </CardBody>
            </Card>
        </>
    );
};

export default AzkarCard;
