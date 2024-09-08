import Banner from "@/components/Layout/Banner";
import Prayer from "@/components/Sections/Prayer";
import { Divider } from "@nextui-org/react";

interface IProps {

}
const page = ({ }: IProps) => {
    return <>
        <main className="min-h-screen">
            <Banner />
            <Divider />
            <div className="container mx-auto my-6 px-4">
                <Prayer />
            </div>
        </main>
    </>;
};

export default page;