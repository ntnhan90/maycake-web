import CustomEditor from "@/components/custom-editor";

type Props = {
    params: {
        slug: string
    }
}
export default function FProductPage({ params }: Props) {
    const { slug } = params
    return (
        <section className="contact spad">
            Product slug: {slug}
            <CustomEditor />
        </section>
    );
}
