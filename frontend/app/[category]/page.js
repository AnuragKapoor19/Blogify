import Header from "@/components/Header"

export default async function page({ params }) {
    const { category } = await params
    return (
        <>
            <Header />
            {category}
        </>
    )
}
