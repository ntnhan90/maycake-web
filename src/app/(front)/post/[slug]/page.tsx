

type Props = {
    params: {
        slug: string
    }
}

export default function FPostPage({ params }: Props) {
    const { slug } = params
    return (
        <section className="contact spad">
            Post slug: {slug}
        </section>
    );
}
