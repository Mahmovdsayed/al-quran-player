'use client'

import { surah } from "@/static/surah";
import { Button, Input, Card, CardBody } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { SunIcon } from "@/icons/SunIcon";
import { MoonIcon } from "@/icons/MoonIcon";
import { useRouter } from "next/navigation";
import confetti from 'canvas-confetti';

interface IProps { }

const Navigation = ({ }: IProps) => {
    const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResult, setSearchResult] = useState<any>(null);
    const router = useRouter();
    const buttonRef = useRef(null);

    let scalar = 5;
    const pineapple = confetti.shapeFromText({ text: '💙', scalar });

    const handleConfetti = () => {
        confetti({
            shapes: [pineapple],
            particleCount: 30,
            scalar,
            spread: 70,
            origin: { y: 0.6 },
        });
    };




    return (
        <>
            <div className="">
                <Navbar className="bg-gray-200 dark:bg-[#22213d]">
                    <NavbarBrand>
                        <p className="font-bold text-inherit uppercase">AL-Quran Player</p>
                    </NavbarBrand>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <div className="space-x-2">
                                <Button
                                    onClick={() => setTheme("light")}
                                    ref={buttonRef}
                                    onPress={handleConfetti}
                                    startContent={<SunIcon />}
                                    size="sm"
                                    isIconOnly
                                    color="default"
                                    radius="sm"
                                />
                                <Button
                                    onClick={() => setTheme("dark")}
                                    ref={buttonRef}
                                    onPress={handleConfetti}
                                    startContent={<MoonIcon />}
                                    size="sm"
                                    radius="sm"
                                    isIconOnly
                                    color="default"
                                />
                            </div>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>

        </>
    );
};

export default Navigation;
