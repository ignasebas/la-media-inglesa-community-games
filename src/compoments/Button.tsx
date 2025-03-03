import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
    text: string;
    link?: string;
    clickFunction?: () => void;
}

function Button({ text, link, clickFunction}: ButtonProps) {
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