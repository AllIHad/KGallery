import Link from "next/link"

type Props = {
    topic: string,
    page: string | undefined,
    previousPage: string | null,
    nextPage: string | null,
}

export default function Footer({ topic, page, previousPage, nextPage }: Props) {

    if (!previousPage && !nextPage) return

    const pageNums: number[] = []
    if (previousPage && nextPage) {
        for (let i = parseInt(previousPage) + 1; i < parseInt(nextPage); i++) {
            pageNums.push(i)
        }
    }

    const nextPageArea = nextPage
        ? (
            <Link href={`/results/${topic}/${nextPage}`} className={!previousPage ? "mx-auto" : ""} >
                {!previousPage ? "more" : null} &gt;&gt;&gt;
            </Link>
        )
        : null

    const previousPageArea = previousPage
        ? (
            <>
                <Link href={`/results/${topic}/${previousPage}`} className={!nextPage ? "mx-auto" : ""} >
                    &lt;&lt;&lt; {!nextPage ? "back" : null}
                </Link>

                {pageNums.map((num, i) => (
                    page && num === parseInt(page)
                        ? <span key={i}>{num}</span>
                        : (
                            <Link key={i} href={`/results/${topic}/${num}`} className="underline"
                            >{num}</Link>
                        )
                ))}
            </>
        )
        : null

    return (
        <footer className="flex flex-row justify-between items-center px-2 py-4 font-bold w-60 mx-auto">
            {previousPageArea}
            {nextPageArea}
        </footer>
    )
}