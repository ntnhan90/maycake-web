import Image from "next/image";
type Props = {
  color: string;
};

export default function CakePreview({ color }: Props) {
  return (
    <div className="cake-page">
      <div className="cake-wrap">
        <Image
            src="/img/vuong-16x9cm-dish.png"
            className="dish"
            alt="Cake dish"
            width={400}
            height={400}
        />

        <div className="cake-container">
            <Image
              src="/img/vuong-16x9cm-base.png"
              className="cake"
              alt="Cake base"
              width={400}
              height={400}
            />

            <div className="color-layer" style={{ backgroundColor: color }} />
         </div>
      </div>

      <input className="form-control mt-3"  placeholder="Chúc mừng..." />
    </div>
  );
}