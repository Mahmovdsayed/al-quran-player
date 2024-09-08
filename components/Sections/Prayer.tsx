'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from '@nextui-org/react';

const Prayer = () => {
    const [prayerTimes, setPrayerTimes] = useState<any>(null);
    const [locationName, setLocationName] = useState<string | null>("");
    const [date, setDate] = useState<any>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to get the current date
    function getCurrentDate(): string {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = now.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Function to convert 24-hour time to 12-hour format with AM/PM
    function convertTo12Hour(time: string): string {
        let [hour, minute] = time.split(':').map(Number);
        let period = 'AM';

        if (hour >= 12) {
            period = 'PM';
            hour = hour > 12 ? hour - 12 : hour;
        } else if (hour === 0) {
            hour = 12;
        }

        return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    }

    // Function to get user's current location
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
                timeout: 10000, // 10 seconds timeout for geolocation request
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
            setError("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    };

    // Success callback for geolocation
    const successCallback = async (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        await GetPrayerTimes(latitude, longitude);
        await getLocationName(latitude, longitude);
    };

    // Error callback for geolocation
    const errorCallback = (error: GeolocationPositionError) => {

        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.error("User denied the request for geolocation.");
                setError("User denied the request for geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                setError("The request to get user location timed out.");
                break;
        }
        setLoading(false);
    };

    // Function to get prayer times from API
    const GetPrayerTimes = async (latitude: number, longitude: number) => {
        const currentDate = getCurrentDate();

        try {
            const { data } = await axios.get(
                `https://api.aladhan.com/v1/timings/${currentDate}?latitude=${latitude}&longitude=${longitude}&method=5`
            );
            console.log(data);
            setDate(data)
            // Convert prayer times to 12-hour format
            const formattedTimes = {
                Fajr: convertTo12Hour(data.data.timings.Fajr),
                Sunrise: convertTo12Hour(data.data.timings.Sunrise),
                Dhuhr: convertTo12Hour(data.data.timings.Dhuhr),
                Asr: convertTo12Hour(data.data.timings.Asr),
                Maghrib: convertTo12Hour(data.data.timings.Maghrib),
                Isha: convertTo12Hour(data.data.timings.Isha),
            };

            setPrayerTimes(formattedTimes);
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            setError('Error fetching prayer times');
        }
        setLoading(false);
    };

    // Function to get location name using reverse geocoding
    const getLocationName = async (latitude: number, longitude: number) => {
        try {
            const { data } = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            setLocationName(data.display_name);
        } catch (error) {
            console.error('Error fetching location name:', error);
            setError('Error fetching location name');
        }
    };

    // Get user location when component mounts
    useEffect(() => {
        getUserLocation();
    }, []);

    // Render component
    return (
        <div className='container mx-auto my-4'>
            {loading && <p className='text-center my-3'>Please allow location access to get prayer times. </p>}
            {loading && <p className='text-center my-3'><Spinner /></p>}
            {error && <p>{error}</p>}
            {prayerTimes && (
                <div>
                    <Card shadow="none" className="w-full bg-gray-200 dark:bg-[#181818]">
                        <CardHeader><h2 className='text-medium md:text-xl font-normal'>Prayer Times at <span className='font-medium ms-1'>{` ${locationName}`}</span></h2></CardHeader>
                        <Divider />
                        <CardBody>
                            <div className='flex justify-between items-center'>
                                <span>Fajr</span>
                                <span className='font-semibold'>{prayerTimes.Fajr}</span>
                            </div>
                            <Divider className='my-3' />
                            <div className='flex justify-between items-center'>
                                <span>Sunrise</span>
                                <span className='font-semibold'>{prayerTimes.Sunrise}</span>
                            </div>
                            <Divider className='my-3' />
                            <div className='flex justify-between items-center'>
                                <span>Dhuhr</span>
                                <span className='font-semibold'>{prayerTimes.Dhuhr}</span>
                            </div>
                            <Divider className='my-3' />
                            <div className='flex justify-between items-center'>
                                <span>Asr</span>
                                <span className='font-semibold'>{prayerTimes.Asr}</span>
                            </div>
                            <Divider className='my-3' />
                            <div className='flex justify-between items-center'>
                                <span>Maghrib</span>
                                <span className='font-semibold'>{prayerTimes.Maghrib}</span>
                            </div>
                            <Divider className='my-3' />
                            <div className='flex justify-between items-center'>
                                <span>Isha</span>
                                <span className='font-semibold'>{prayerTimes.Isha}</span>
                            </div>
                        </CardBody>
                        <Divider />
                        <CardFooter className='flex justify-center items-center'>
                            <span className='text-sm text-center font-semibold text-default-500'>{date.data.date.hijri.weekday.en} {date.data.date.hijri.day} {date.data.date.hijri.month.en}, {date.data.date.hijri.year}  - ({date.data.date.readable})</span>
                        </CardFooter>
                    </Card>
                    <div className='flex items-center justify-center my-5'>
                        <audio src='https://cdn.aladhan.com/audio/adhans/a11-mansour-al-zahrani.mp3' controls />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prayer;
