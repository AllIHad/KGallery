import type { ImagesResults } from "@/Models/Images";

function getPageNumber(url: string) {
    const { searchParams } = new URL(url);

    return searchParams.get('page')
}

export default function getPrevNextPage(images: ImagesResults) {
    let nextPage = images?.next_page ? getPageNumber(images.next_page) : null;

    const previousPage = images?.prev_page ? getPageNumber(images.prev_page) : null;

    const totalPages = images.total_results % images.per_page ? Math.ceil(images.total_results / images.per_page) : (images.total_results / images.per_page) + 1

    if (previousPage && (parseInt(previousPage) + 5) < totalPages) {
        nextPage = (parseInt(previousPage) + 5).toString()
    }

    if(nextPage && parseInt(nextPage) >= totalPages ) nextPage = null

    return {
        previousPage,
        nextPage
    }
}