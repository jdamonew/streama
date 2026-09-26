import { FpsOption } from "@/types/firestore";

export interface QualityOptionConfig {
    value: FpsOption;
    label: string;
    hint: string;
    feature: string;
    quality?: string;
    fps?: number;
    quality_text: string;
}

export interface QualitySelectorProps {
    value: FpsOption;
    onChange: (fps: FpsOption) => void;
    disabled?: boolean;
}