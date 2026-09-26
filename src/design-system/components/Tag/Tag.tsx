import { ReactNode } from "react";
import * as Styles from "./Tag.styles";

export interface TagProps {
    children: ReactNode;
    active?: boolean
}

export function Tag({ children, active }: TagProps) {
    return (
        <Styles.StyledTag $active={active}>
            {children}
        </Styles.StyledTag>
    );
}
