import fetchImages from "@/lib/fetchImages"
import type { ImagesResults } from "@/Models/Images"
import ImageContainer from "./ImgContainer"
import addBlurredDataUrls from "@/lib/getBase64"
import getPrevNextPage from "@/lib/GetPrevNext"
import Footer from "./Footer"

type Props = {
    topic?: string | undefined,
    page?: string | undefined,
}

export default async function Gallery({ topic = 'curated', page }: Props) {

    let url
    if (topic === 'curated' && page) {
        // brwosing beyond Home page
        url = `https://api.pexels.com/v1/curated?page=${page}`
    } else if (topic === 'curated') {
        // home page
        url = 'https://api.pexels.com/v1/curated'
    } else if (!page) {
        // search results page
        url = `https://api.pexels.com/v1/search?query=${topic}`
    } else {
        //beyond the fisrt page 
        url = `https://api.pexels.com/v1/search?query=${topic}&page=${page}`
    }

    const images: ImagesResults | undefined = await fetchImages(url)

    if (!images || images.per_page === 0) return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>

    const photoWithBlurred = await addBlurredDataUrls(images)

    // calculate pagination
    const { previousPage, nextPage } = getPrevNextPage(images)

    const footerProps = { topic, page, nextPage, previousPage }

    return (
        <>
            <section className="px-1 my-3 grid  grid-cols-gallery auto-rows-[10px]">

                {photoWithBlurred.map(photo => (
                    <ImageContainer photo={photo} key={photo.id} />
                ))}

            </section>
            {/* add Footer */}
            <Footer {...footerProps}/>
        </>
    )
}