export interface Post {
    userId?: number,
    id: number,
    title: string,
    body: string,
}

export interface SortingOption {
    label: string,
    value: number,
}

export interface PostsListProps {
    posts: Post[]
}

export interface FiltersProps {
    sort(option: SortingOption): void,
    activeSortingOption: number,
    count: number,
    currentPage: number,
    paginate(pageNumber: number): void,
}