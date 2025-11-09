import React from 'react';

interface HeaderProps {
    colors?: string[] | null;
}

export const Header: React.FC<HeaderProps> = ({ colors: propColors }) => {
    const title = "Old Masters";

    if (!propColors || propColors.length === 0) {
        return (
            <header className="text-center">
                <h1
                    style={{ fontFamily: "'Silkscreen', sans-serif", fontSize: '32px', color: '#000000' }}
                    className="py-2"
                >
                    {title}
                </h1>
            </header>
        );
    }

    const colors = propColors;
    let colorIndex = 0;

    return (
        <header className="text-center">
            <h1
                style={{ fontFamily: "'Silkscreen', sans-serif", fontSize: '32px' }}
                className="py-2"
            >
                {title.split('').map((char, index) => {
                    if (char === ' ') {
                        return <span key={index}> </span>;
                    }
                    const color = colors[colorIndex % colors.length];
                    colorIndex++;
                    return (
                        <span key={index} style={{ color: color }}>
                            {char}
                        </span>
                    );
                })}
            </h1>
        </header>
    );
};