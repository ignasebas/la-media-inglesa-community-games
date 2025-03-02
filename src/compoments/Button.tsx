import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
    text: string;
    link?: string;
    clickFunction?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, link=null, clickFunction=null}) => {
    return (
        <>
            {link ? (
                <Link to={link} className="button">
                    {text}
                </Link>
            ) : null}

            {clickFunction ? (
                <a className="secondary-button" onClick={clickFunction}>{text}</a>
            ) : null}

            {!clickFunction && !link ? (
                <button>{text}</button>
            ) : null}
        </>
    );
}

export default Button;