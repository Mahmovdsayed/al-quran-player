'use client';

import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link } from "@nextui-org/react";
import { FaInfoCircle } from "react-icons/fa";

interface IProps {
    SurahId: any;
    info: any[any];
}

const AboutSurah = ({ SurahId, info }: IProps) => {
    const parseContent = (content: string) => {
        return parse(content, {
            replace: (domNode: any) => {
                if (domNode.type === 'tag' && domNode.name === 'h2') {
                    return <>
                        <Divider className='my-3' />
                        <h2 className="text-2xl font-bold mt-4 mb-2">
                            {domToReact(domNode.children)}
                        </h2>
                    </>;
                } else if (domNode.type === 'tag' && domNode.name === 'p') {
                    return <>
                        <p className="mb-3 text-default-600">
                            {domToReact(domNode.children)}
                        </p>

                    </>;
                }
                return domToReact(domNode);
            },
        });
    };

    return (
        <div className="px-4 my-4">
            <div>
                {parseContent(info.chapter_info.text)}
                <Divider className='mb-4' />
                <h4 className='text-center text-sm font-semibold text-default-500'>source: {info.chapter_info.source}</h4>
            </div>
        </div>
    );
};

export default AboutSurah;
