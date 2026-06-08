import { type ReactNode } from "react";

export type Props = {
    title: string; 
    children: ReactNode
}

export const Header: React.FC<Props> = ({children, title}) => {
    return (
        <header>
            {children}
            <h1>{title}</h1>
        </header>
    )
}