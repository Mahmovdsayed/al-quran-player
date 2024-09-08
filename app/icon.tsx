import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
    return [
        {
            contentType: 'image/png',
            size: { width: 48, height: 48 },
            id: 'small',
        },
        {
            contentType: 'image/png',
            size: { width: 72, height: 72 },
            id: 'medium',
        },
    ]
}

export default function Icon({ id }: { id: string }) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    borderRadius: "50%",
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: "588px",
                    background: '#0000FF',
                    color: '#fff',
                }}
            >
                QP
            </div>
        )
    )
}