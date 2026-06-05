import type { ReactNode } from "react";

type Props = {
    readonly children: ReactNode;
    readonly title?: string; 
}

export const Card: React.FC<Props> = ({ title, children}) => {
    return (
        <div className="card">
            {title && <h3>{title}</h3>}
            {children}
        </div>
    )
}