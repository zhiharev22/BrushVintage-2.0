import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1
                style={{ fontFamily: "'Permanent Marker', cursive" }}
                className="text-5xl text-black py-2"
            >
                Vintage Brush App
            </h1>
        </header>
    );
};