import "./FeaturedImage.css";

export default function FeaturedImage() {
  return (
    <section className="featured-image">
      <div className="container">
        <div className="featured-frame">
          <img className="featured-img" src="/4.png" alt="Imagem destaque" />
        </div>
      </div>
    </section>
  );
}