import type { ReactNode } from "react";

interface Props {
    readonly to: string, 
    readonly children: ReactNode,
}

export const Link: React.FC<Props> = ({to, children}) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        window.history.pushState(null, '', to); 
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    return (
        <a href={to} onClick={handleClick}>{children}</a>
    )
}