import styled from 'styled-components';

export const CinemaModal = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
    z-index: ${({ theme }) => theme.zIndex.modal};
    background: ${({ theme }) => theme.colors.black};
    padding: ${({ theme }) => theme.spacing.md};
`;
export const CinemaCardModal = styled.div`
    width: 100%;
    height: 80%;
    background: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: ${({ theme }) => theme.spacing.lg};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    padding: ${({ theme }) => theme.spacing.md};
`;
export const CinemaModalActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.sm};
`;