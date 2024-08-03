import { getPlaiceholder } from 'plaiceholder'
import type { Photo, ImagesResults } from '@/Models/Images'

async function getBase64(imgUrl: string) {
    try {
        const res = await fetch(imgUrl)

        if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)

        const buffer = await res.arrayBuffer()

        const { base64 } = await getPlaiceholder(Buffer.from(buffer))

        // console.log(base64)

        return base64

    } catch (e) {
        if (e instanceof Error) console.log(e.stack)
    }
}

export default async function addBlurredDataUrls(images: ImagesResults): Promise<Photo[]> {
    // make all requests at once instead of waiting each request avoiding a waterfall
    const base64Promises = images.photos.map(photo =>getBase64(photo.src.large))

    // Resolve all requests in order 
    const base64Results = await Promise.all(base64Promises)

    const photoWithBlurred: Photo[] = images.photos.map((photo, i) => {
        photo.blurredDataUrl = base64Results[i]
        return photo
    })

    return photoWithBlurred
}