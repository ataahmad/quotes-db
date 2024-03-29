export interface SeedAPIQuote {
    _id: string;
    author: string;
    content: string;
    tags: string[];
    authorSlug: string;
    length: number;
    dateAdded: string;
    dateModified: string;
}