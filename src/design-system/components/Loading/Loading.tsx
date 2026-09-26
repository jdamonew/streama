import * as Styles from './Loading.styles'

export type LoadingSize = 'sm' | 'md' | 'lg';

export interface LoadingProps {
    color?: string;
    size?: LoadingSize;
}

export const Loading = ({ color, size = 'sm' }: LoadingProps) => {
    return (
        <Styles.StylesLoading $color={color} $size={size}>
        </Styles.StylesLoading>
    )
}

