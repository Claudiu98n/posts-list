export interface Post {
    userId?: number,
    id: number,
    title: string,
    body: string,
}

export interface PostsListProps {
    posts: Post[],
}

export interface FiltersProps {
    setActiveSortingOption: React.Dispatch<React.SetStateAction<number>>,
    activeSortingOption: number,
    count: number,
    currentPage: number,
    paginate(pageNumber: number): void,
}