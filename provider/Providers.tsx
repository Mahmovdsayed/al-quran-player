'use client'

import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import LoadingScreen from '@/components/Layout/LoadingScreen';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query'

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    const router = useRouter();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);



    return (
        <>
            {loading ? (
                <LoadingScreen />
            ) : (
                <NextUIProvider navigate={router.push}>
                    <QueryClientProvider client={queryClient}>
                        <NextThemesProvider attribute="class">
                            <Toaster
                                duration={1000}
                                position='top-center'
                                theme={"light"}
                                richColors
                                expand={false}
                            />
                            <Provider store={store}>
                                <PersistGate loading={null} persistor={persistor}>
                                    {children}
                                </PersistGate>
                            </Provider>
                        </NextThemesProvider>
                    </QueryClientProvider>
                </NextUIProvider>
            )}
        </>
    );
}
