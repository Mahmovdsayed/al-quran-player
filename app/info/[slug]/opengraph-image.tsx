import { getChapter } from '@/context/surahContext';
import { ImageResponse } from 'next/og';

export default async function Image({
    params,
}: {
    params: { slug: string };
}): Promise<ImageResponse> {
    const id = params.slug;

    try {
        const data = await getChapter(id);
        const englishName = data.name_simple || '';

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '1200px',
                        height: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: 'linear-gradient(to right, rgb(255, 228, 230), rgb(204, 251, 241))',
                        fontSize: '40px',
                        padding: '50px',
                        color: '#000',
                        textAlign: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <h2 style={{
                        marginBottom: "0px",
                        paddingBottom: "0px",
                    }}>
                        Surah {englishName}
                    </h2>
                    <span style={{
                        color: "#252525",
                        fontSize: "30px"
                    }}>{`Discover Surah ${data?.name_simple}, the ${data?.id}th chapter of the Quran, revealed in ${data?.revelation_place === 'makkah' ? 'Makkah' : 'Madinah'}. Listen to the beautiful recitation of Surah ${data?.name_simple} and explore its profound meanings and messages.`}</span>
                </div>
            ),
            {
                width: 1200,
                height: 600,

            }
        );
    } catch (error) {
        console.error('Error generating image:', error);

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '1200px',
                        height: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: 'radial-gradient(at left bottom, rgb(190, 18, 60), rgb(219, 39, 119))',
                        fontSize: '45px',
                        padding: '20px',
                        fontWeight: 'normal',
                        color: '#ffffff',
                        textAlign: 'center',
                        overflow: 'hidden',
                    }}
                >
                    Surah not found

                </div>
            ),
            {
                width: 1200,
                height: 600,
            }
        );
    }
}
