import CustomEditor from "@/components/custom-editor";


type Props = {
  params: {
    slug: string
  }
}
export default function FTagPage({ params }: Props) {
    const { slug } = params
    return (
        <section className="contact spad">
            Tag slug: {slug}
            <CustomEditor />
        </section>
    );
}
