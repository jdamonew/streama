import { useState } from 'react'
import { Button, Heading, Input, Modal } from '@/design-system'
import { SubHeading } from '@/design-system/components/Typography';
import { useFeatureFlagPayload } from '@posthog/react';
import { Check, Copy, HandHelping, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

import BillieCat from '@/assets/videos/cat-01.webm';
import BillieCat2 from '@/assets/videos/cat-02.webm';
import PixelHeart from '@/assets/pixelart/heart-pixel.png';
import PixelGithub from '@/assets/pixelart/github.png';
import PixelLinkedin from '@/assets/pixelart/linkedin.png';

import * as Styles from './BuyMeACoffeeFloat.styles';
import { useIsMobile } from '@/hooks/useIsMobile';

export const BuyMeACoffeeFloat = () => {

    const isMob = useIsMobile(890);

    const pixInfoPayload = useFeatureFlagPayload('pix-infos')
    const pixInfo =
        typeof pixInfoPayload === 'object' &&
            pixInfoPayload !== null &&
            !Array.isArray(pixInfoPayload) &&
            typeof pixInfoPayload.key === 'string'
            ? pixInfoPayload.key
            : ''

    const [showModal, setShowModal] = useState<boolean>(false)
    const [copied, setCopied] = useState<boolean>(false)
    const [blur, setBlur] = useState<boolean>(true)

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(pixInfo);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            console.error('Erro ao copiar')
        }
    }

    return (
        <>
            <Styles.FloatStyles>
                <Button onClick={() => setShowModal(true)}>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        src={BillieCat}
                        width={45}
                    />

                    Oiiii...Tudo Bem???
                </Button>
            </Styles.FloatStyles>

            {showModal &&
                <Modal width={1080} style={{ padding: 0, display: 'flex' }}>

                    {
                        !isMob &&
                        <Styles.PanelModal>
                            <Styles.PanelHeaderModal>
                                <Heading level={1} color='#FFFFFF'>
                                    Gostou do <br /> projeto?
                                </Heading>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    src={BillieCat2}
                                    width={125}
                                />
                            </Styles.PanelHeaderModal>

                            <Styles.SocialsContainer>
                                <Heading level={2} color='#FFFFFF'>
                                    Me conheça:
                                </Heading>
                                <Styles.Socials>
                                    <a href={import.meta.env.VITE_GITHUB} target='_blank'>
                                        <img src={PixelGithub} width={50} />
                                    </a>
                                    <a href={import.meta.env.VITE_LINKEDIN} target='_blank'>
                                        <img src={PixelLinkedin} width={50} />
                                    </a>

                                </Styles.Socials>

                            </Styles.SocialsContainer>
                        </Styles.PanelModal>
                    }

                    <Styles.DetailsModal $isMob={!isMob}>

                        <Styles.ModalActions>
                            <Styles.CloseModal>
                                <Button variant="ghost" onClick={() => setShowModal(false)} >
                                    <X color='#5d2ad9' />
                                </Button>
                            </Styles.CloseModal>
                        </Styles.ModalActions>

                        <Styles.TagSupport>
                            <HandHelping />
                            APOIE O PROJETO
                        </Styles.TagSupport>

                        <Heading level={1}>Oe, Eu sou Jóbia Damone</Heading>
                        <SubHeading>Desenvolvedora Front-End Indie</SubHeading>

                        <Styles.TextModal>
                            Como gamer e apaixonada por compartilhar momentos com amigos, <b>criei este projeto com a ideia de oferecer uma forma simples, prática e gratuita de compartilhar esses momentos com a comunidade.</b>
                            <br /> <br />
                            O projeto ainda é novo e está em desenvolvimento. <b>Tenho várias ideias que quero trazer para vocês!!</b>
                        </Styles.TextModal>

                        <Styles.TextInformation>
                            <img src={PixelHeart} width={50} />
                            <Styles.TextModal>
                                Se você gosta do projeto e quiser contribuir para que ele continue crescendo, <b>você pode apoiar o meu trabalho através do Pix.</b>
                                <br />
                                <span>
                                    Não é necessário, mas toda contribuição ajuda a manter o projeto e incentiva o desenvolvimento de novas funcionalidades.
                                </span>
                            </Styles.TextModal>

                        </Styles.TextInformation>

                        <Styles.PixContainer>
                            <Styles.PixBlurContainer $blur={blur}>

                                <QRCodeSVG value={pixInfo} fgColor='#5d2ad9' />

                                <Styles.CopyPixContainer>
                                    <Heading level={3}>Escaneie o QR Code ou copie a chave pix:</Heading>
                                    <Input value={pixInfo} />
                                    <Button variant="secondary" onClick={handleCopy} disabled={blur}  >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                        {copied ? 'Copiado!' : 'Copiar código'}
                                    </Button>
                                </Styles.CopyPixContainer>
                            </Styles.PixBlurContainer>

                            {
                                blur &&
                                <Styles.ShowPix>
                                    <Button onClick={() => setBlur(false)}>
                                        Mostrar Pix
                                    </Button>
                                </Styles.ShowPix>
                            }

                        </Styles.PixContainer>

                        <Styles.TextModal>
                            <b>Obrigada por apoiar um projeto independente.</b>
                        </Styles.TextModal>

                    </Styles.DetailsModal>

                </Modal>
            }


        </>

    )
}

export default BuyMeACoffeeFloat