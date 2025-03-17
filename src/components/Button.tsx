import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
    text: string;
    link?: string;
    clickFunction?: () => void;
    fullWidth?: boolean;
}

function Button({ text, link, clickFunction, fullWidth = false}: ButtonProps) {
    return (
        <>
            {link ? (
                <Link to={link} className={`button ${fullWidth ? 'full-width' : ''}`}>
                    {text}
                </Link>
            ) : null}

            {clickFunction ? (
                <a className={`secondary-button ${fullWidth ? 'full-width' : ''}`} onClick={clickFunction}>{text}</a>
            ) : null}

            {!clickFunction && !link ? (
                <button className={fullWidth ? 'full-width' : ''}>{text}</button>
            ) : null}
        </>
    );
}

export default Button;