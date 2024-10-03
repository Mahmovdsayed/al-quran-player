'use client'

import { useEffect } from "react";

interface IProps {

}
const AdBanner = ({ }: IProps) => {
    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})

        } catch (error: any) {
            console.log(error)
        }
    }, [])

    return (

        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-7851367835426330"
            data-ad-slot="4729852658"
            data-ad-format="auto"
            data-full-width-responsive="true"
        >

        </ins>
    )
};

export default AdBanner;