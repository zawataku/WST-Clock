'use client';

import { useState, useEffect } from 'react';
import { useLocalStorage } from "usehooks-ts"

const convertToWST = (wakeupTime: string, currentTime: Date): string => {
    if (!wakeupTime) return '';

    const [wakeupHours, wakeupMinutes] = wakeupTime.split(':').map(Number);
    const wakeupDate = new Date();
    wakeupDate.setHours(wakeupHours, wakeupMinutes, 0, 0);

    let diff = currentTime.getTime() - wakeupDate.getTime();

    if (diff < 0) {
        diff += 24 * 60 * 60 * 1000; // 日を跨ぐ場合（差分が負になる場合）に24時間を加算
    }

    const wstHours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const wstMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${wstHours.toString().padStart(2, '0')}:${wstMinutes.toString().padStart(2, '0')}`;
};

export default function Clock() {
    const [wakeupTime, setWakeupTime] = useLocalStorage('WST_TIME', '');
    const [wst, setWst] = useState('');
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (wakeupTime && currentTime) {
            setWst(convertToWST(wakeupTime, currentTime));
        }
    }, [wakeupTime, currentTime]);

    return (
        <div className='flex flex-col gap-5'>
            <div className="p-3 text-center">
                <label htmlFor="wakeup-time" className="mb-2 block text-xl font-medium">
                    今日の起床時刻は...？
                </label>
                <input
                    id="wakeup-time"
                    type="time"
                    value={wakeupTime}
                    onChange={(e) => setWakeupTime(e.target.value)}
                    className="w-4/5 rounded-lg border border-gray-300 px-3 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-2/4"
                />
            </div>

            <div className="flex flex-col justify-evenly gap-10 p-3 text-center md:flex-row md:gap-5">
                <div className="flex flex-col items-center gap-2 text-xl">
                    <p className="">現在時刻（現地時間）:</p>
                    <p className="font-mono text-2xl">
                        {currentTime
                            ? currentTime.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                            })
                            : '--:--'}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-2 text-xl">
                    <p className="">現在時刻（WST）:</p>
                    <p className="font-mono text-2xl text-blue-600">{wst || '--:--'}</p>
                </div>
            </div>
        </div>
    );
}
