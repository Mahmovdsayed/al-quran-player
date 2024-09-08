interface IProps {

}
const page = ({ }: IProps) => {
    return <>
        <main className="min-h-screen flex  items-center justify-center flex-col">
            <h2 className="font-bold text-4xl">Surah Al-Hijr </h2>
            <p className="mb-4 font-medium text-lg">(hazza al balushi)</p>
            <audio src="https://server11.mp3quran.net/hazza/015.mp3" controls />
        </main>
    </>;
};

export default page;