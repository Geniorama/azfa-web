export interface HeadingType {
    id: number;
    smallTitle?: string;
    title?: string;
    description?: string;
    alignment?: "left" | "center" | "right";
    imageUrl?: string;
}
export interface DownloadType {
    id: number;
    title?: string;
    buttonText?: string;
    documentUrl?: string;
    cover?: {
        url: string;
        alternativeText?: string;
    };
    target?: string;
}

export interface OptionType {
    id: string;
    label: string;
    value: string;
}