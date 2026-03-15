type Props = {
    params: {
        slug: string
    }
}
export default function FCategoryPage({ params }: Props) {
    const { slug } = params
    return (
        <section className="contact spad">
            Blog Category : {slug}
        </section>
    );
}
