'use client'
import React from "react";
import { Breadcrumbs, BreadcrumbItem, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";
import { surah } from "@/static/surah";
import { FaQuran } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

interface IProps {
    name: any
}
const Bread = ({ name }: IProps) => {
    return <>
        <Breadcrumbs
            variant="solid"
            className="my-3"
            size="sm"
            itemClasses={{
                item: "px-2",
                separator: "px-0",
            }}
        >
            <BreadcrumbItem startContent={<IoHome />} href="/">Home</BreadcrumbItem>
            <BreadcrumbItem startContent={<FaQuran />} >{name}</BreadcrumbItem>

        </Breadcrumbs>
    </>;
};

export default Bread;