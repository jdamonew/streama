import styled, { css } from "styled-components";

export const StyledTag = styled.p <{ $active?: boolean }>`
    padding: 2px ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    font-size: ${({ theme }) => theme.typography.fontSizes.xxs};
    margin: 0;

    ${({ $active }) => {
        return (
            !$active && css`
                background-color: ${({ theme }) => theme.colors.primaryOpacityLow};
                color: ${({ theme }) => theme.colors.primary};
            `
        )
    }}

`