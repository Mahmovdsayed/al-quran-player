'use client'
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IProps {

}
const page = ({ }: IProps) => {
    
    const [first, setfirst] = useState(0)
    return <>
        <div className="space-x-5">
            <Button onClick={() => setfirst(first + 1)}>+</Button>
            <span>{first}</span>
            <Button onClick={() => setfirst(first - 1)}>-</Button>
        </div>
    </>;
};

export default page;