import { ImageResponse } from 'next/og'

export default async function Image({
    params,
    id,
}: {
    params: { id: string }
    id: number
}) {


    return new ImageResponse(
        (
            <div
                style={
                    {
                        width: '1200px',
                        height: '600px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: 'radial-gradient(at left bottom, rgb(15, 23, 42), rgb(88, 28, 135), rgb(15, 23, 42))',
                        fontSize: '40px',
                        padding: '50px',
                        fontWeight: 'bolder',
                        color: '#ffffff',
                        textAlign: 'center',
                        overflow: 'hidden',
                    }
                }
            >
                <h1>AL-Quran Player</h1>
            </div>
        ), {
        width: 1200,
        height: 600
    }
    )
}