import { useEffect, useMemo, useState } from "react";
import "./ImageCarousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel() {
  const images = useMemo(() => ["/1.png", "/2.png", "/3.png"], []);
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="carousel-section">
      <div className="container">
        <div className="carousel">
          <div className="carousel-viewport">
            <img
              src={images[idx]}
              alt={`Imagem ${idx + 1}`}
              className="carousel-img"
              draggable="false"
            />

            <button className="carousel-arrow left" onClick={prev} aria-label="Imagem anterior">
              <ChevronLeft size={22} strokeWidth={3} />
            </button>

            <button className="carousel-arrow right" onClick={next} aria-label="Próxima imagem">
              <ChevronRight size={22} strokeWidth={3} />
            </button>

            <div className="carousel-dots" aria-label="Navegação do carrossel">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === idx ? "active" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Ir para imagem ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}