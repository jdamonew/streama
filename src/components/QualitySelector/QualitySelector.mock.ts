import { QualityOptionConfig } from "./QualitySelector.types";

export const OPTIONS: QualityOptionConfig[] = [
    {
        value: 5,
        label: '5 FPS',
        hint: 'Economia máxima de dados',
        feature: 'Ultra econòmico',
        fps: 5,
        quality_text: 'Menor qualidade'
    },
    {
        value: 72030,
        label: '720p 30 FPS',
        hint: 'Boa qualidade e economia',
        feature: 'Equilíbrio',
        quality: '720p',
        fps: 30,
        quality_text: 'Qualidade padrão'
    },
    {
        value: 72060,
        label: '720p 60 FPS',
        hint: 'Mais fluidez em HD',
        feature: 'Alta definição',
        quality: '720p',
        fps: 60,
        quality_text: 'Mais fluidez'
    },
    {
        value: 108030,
        label: '1080p 30 FPS',
        hint: 'Alta definição',
        feature: 'Imagem mais nítida',
        quality: '1080p',
        fps: 30,
        quality_text: 'Alta qualidade'
    },
    {
        value: 108060,
        label: '1080p 60 FPS',
        hint: 'Máxima qualidade e fluidez',
        feature: 'Máxima qualidade e fluidez',
        quality: '1080p',
        fps: 60,
        quality_text: 'Melhor experiência'
    },
];