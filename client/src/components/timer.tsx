import { useEffect, useState } from "react";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const Timer = () => {
    const targetDate = '2024-07-31T23:59:59'
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex mt-5">
            {Object.keys(timeLeft).map((time: string) => (
                <div className="flex">
                    <div className="flex flex-col items-center" >
                        <h1 className="text-6xl font-bold">{timeLeft[time as keyof TimeLeft] < 10 ? `0${timeLeft[time as keyof TimeLeft]}` : timeLeft[time as keyof TimeLeft]}</h1>
                        <h3 className="first-letter:capitalize text-slate-300 px-2.5">{time}</h3>
                    </div>
                    {time !== 'seconds' && <h1 className="text-6xl font-bold h-12 flex items-center mx-4"> : </h1>}
                </div>
            ))}
            <h3 className="ml-4 text-xl font-medium w-28 text-orange-500 uppercase">Till the End of Voting</h3>
        </div>
    );
};