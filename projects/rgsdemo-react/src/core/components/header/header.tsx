import type { Props } from '@core/components/header/header.ts'

export const Header: React.FC<Props> = ({children, title}) => {
    return (
        <header>
            {children}
            <h1>{title}</h1>
        </header>
    )
}