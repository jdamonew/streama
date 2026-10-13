
import { useEffect, useState } from "react";

export interface CircularCountdownProps {
    duration: number;
    size?: number;
    strokeWidth?: number;
    onComplete?: () => void;
}

export function CircularCountdown({
    duration,
    size = 64,
    strokeWidth = 5,
    onComplete,
}: CircularCountdownProps) {
    const [remaining, setRemaining] = useState(duration);

    useEffect(() => {
        setRemaining(duration);

        const endTime = Date.now() + duration * 1000;

        const interval = window.setInterval(() => {
            const timeLeft = Math.max(
                0,
                (endTime - Date.now()) / 1000,
            );

            setRemaining(timeLeft);

            if (timeLeft <= 0) {
                window.clearInterval(interval);
                onComplete?.();
            }
        }, 100);

        return () => window.clearInterval(interval);
    }, [duration, onComplete]);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = duration > 0 ? remaining / duration : 0;
    const offset = circumference * (1 - progress);

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            role="timer"
            aria-label={`${Math.ceil(remaining)} segundos restantes`}
        >
            <defs>
                <linearGradient
                    id="countdown-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#0788A8" />
                    <stop offset="100%" stopColor="#83E87C" />
                </linearGradient>
            </defs>

            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="#6F7842"
                strokeWidth={strokeWidth}
                opacity={0.65}
            />

            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#countdown-gradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />

            <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize={size * 0.4}
                fontWeight="600"
            >
                {Math.ceil(remaining)}
            </text>
        </svg>
    );
}
