export interface getPicturesMethod {
    hasMore: boolean;
    page: number;
    pageCount: number;
    pictures: Pictures[];
}
export interface Pictures {
    cropped_picture: string;
    id: string;
}
export interface Picture {
    author: string;
    camera:string;
    cropped_picture: string;
    full_picture: string;
    id: string;
    tags: string;
}