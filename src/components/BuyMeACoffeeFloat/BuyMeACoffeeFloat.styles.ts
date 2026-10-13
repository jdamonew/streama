import styled from "styled-components";

export const FloatStyles = styled.div`
    position: absolute;
    bottom: 50px;
    right: 50px;
`

export const PanelModal = styled.div`
    background-color: ${({ theme }) => theme.colors.primaryDark};
    border-radius: ${({ theme }) => theme.radii.xl} 0 0 ${({ theme }) => theme.radii.xl};
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.md};
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    /* gap: 32px; */

    h1{
        font-size: 50px;
        text-align: right;
        line-height: 45px;
    }
`

export const PanelHeaderModal = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 32px;
`;

export const SocialsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
    width: 100%;

    
`

export const DetailsModal = styled.div<{ $isMob: boolean }>`
    height: 100%;
    width: ${({ $isMob }) => $isMob ? 70 : 100}%;
    padding: ${({ theme }) => theme.spacing.lg};
`

export const TagSupport = styled.div`
    display: flex;
    align-items:center ;
    gap: 5px;
    padding: 3px 10px;
    width: fit-content;
    font-weight: bold;
    margin-bottom: 16px;
    background-color: ${({ theme }) => theme.colors.primaryOpacityLow};
    border-radius: ${({ theme }) => theme.radii.pill};
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
`;

export const ModalActions = styled.div`
    position: relative;
`

export const CloseModal = styled.div`
    position: absolute;
    right: 0;
`

export const TextModal = styled.p`
    width: 90%;
    
    b{
        color: ${({ theme }) => theme.colors.primary};
    }

    span{
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`

export const TextInformation = styled.div`
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
    background-color: ${({ theme }) => theme.colors.primaryOpacityLow};
    border-radius: ${({ theme }) => theme.radii.md};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md} ;

    img{
        margin-top: 18px;
    }
    
    `

export const PixContainer = styled.div`
    position: relative;
    width: 90%;
    margin-top: 16px;
    border-radius: ${({ theme }) => theme.radii.md};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md} ;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.border};
    `
export const PixBlurContainer = styled.div<{ $blur: boolean }>`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 24px;
    filter: blur(${({ $blur }) => $blur ? 5 : 0}px)

`

export const CopyPixContainer = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
width: 100%;
`

export const ShowPix = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const Socials = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;

    /* img{
        cursor: pointer;
    } */

`
