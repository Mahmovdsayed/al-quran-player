'use client' // Indicates that this is a client-side component

// Import necessary modules and components
import { NextUIProvider } from '@nextui-org/react'; // UI components provider from NextUI
import { useRouter } from 'next/navigation'; // Hook to handle navigation within Next.js
import { useEffect, useState } from 'react'; // React hooks for managing side effects and state
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"; // Theme management for dark/light mode
import LoadingScreen from '@/components/Layout/LoadingScreen'; // Custom loading screen component
import { Toaster } from 'sonner'; // Library for displaying toast notifications
import { Provider } from 'react-redux'; // Redux provider for managing global state
import { persistor, store } from '@/store'; // Import the Redux store configuration
import { PersistGate } from 'redux-persist/integration/react';

// Providers component wraps around the entire app to provide necessary context, theme, and state management
export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter(); // Get the router object to navigate programmatically
    const [loading, setLoading] = useState(true); // Local state to manage the loading screen visibility

    // useEffect hook runs once after the initial render to simulate a loading state
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Hide loading screen after 1 second
        }, 1000);
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <>
            {/* Conditional rendering: show LoadingScreen if still loading, otherwise render the rest */}
            {loading ? (
                <LoadingScreen /> // Show the loading screen while `loading` is true
            ) : (
                // Wrapping the application with various providers
                <NextUIProvider navigate={router.push}> {/* Provides UI components with navigation support */}
                    <NextThemesProvider attribute="class"> {/* Provides theme switching support (e.g., dark/light mode) */}
                        <Toaster
                            duration={1000}
                            position='top-center'
                            theme={"light"}
                            richColors
                            expand={false}
                        /> {/* Setup for toast notifications */}
                        <Provider store={store}> {/* Provides Redux store to the entire app */}
                            <PersistGate loading={null} persistor={persistor}>
                                {children} {/* Render the child components */}
                            </PersistGate>
                        </Provider>
                    </NextThemesProvider>
                </NextUIProvider>
            )}
        </>
    );
}
