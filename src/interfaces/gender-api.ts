export interface GenderApiResponseForASingleName {
    gender: string;
    errno?: number;
}

export interface GenderApiResponseForMultipleNames {
    errno?: number;
    names: GenderApiResponseForASingleName[];
}

export type GenderApiResponse = GenderApiResponseForASingleName | GenderApiResponseForMultipleNames;
