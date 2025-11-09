import React from 'react';

interface ActionButtonProps {
    onClick: () => void;
    disabled: boolean;
    text?: string;
    variant: 'primary' | 'secondary' | 'outline';
    icon?: React.ReactNode;
    className?: string;
    ariaLabel?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, disabled, text, variant, icon, className, ariaLabel }) => {
    const baseClasses = "flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed h-11 text-sm";
    
    const variantClasses = {
        primary: "bg-black hover:bg-gray-800 text-white focus:ring-black",
        secondary: "bg-gray-200 hover:bg-gray-300 text-black focus:ring-black",
        outline: "bg-white border border-gray-300 text-black shadow-sm hover:bg-gray-100 focus:ring-black"
    };

    const paddingClasses = text ? 'px-4' : 'w-11';
    const iconMarginClass = text && icon ? 'mr-2 -ml-1' : '';

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses} ${className || ''}`}
            aria-label={ariaLabel || text}
        >
            {icon && <span className={iconMarginClass}>{icon}</span>}
            {text && <span>{text}</span>}
        </button>
    );
};