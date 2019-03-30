export const extractor = {
    spaces(str: string): string[] {
        return str.split(' ').filter(term => term);
    },
};
