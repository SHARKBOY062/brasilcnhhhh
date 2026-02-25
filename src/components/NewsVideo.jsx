import { useEffect, useRef, useState } from "react";
import "./NewsVideo.css";
import { ChevronLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function NewsVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    // estado inicial fiel: sem som, aguardando ação
    v.muted = true;
    setMuted(true);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      if (v.paused) {
        await v.play();
      } else {
        v.pause();
      }
    } catch {
      // se o browser bloquear play sem interação suficiente, o botão continua disponível
    }
  };

  const toggleMute = async () => {
    const v = videoRef.current;
    if (!v) return;

    const next = !muted;
    v.muted = next;
    setMuted(next);

    // se o usuário ativar som, tentamos tocar (igual comportamento comum desses players)
    if (!next) {
      try {
        await v.play();
      } catch {
        // ok
      }
    }
  };

  return (
    <section className="news-video">
      <div className="container">
        <div className="video-frame">
          {/* seta grande na lateral esquerda */}
          <button className="nav-left" type="button" aria-label="Voltar">
            <ChevronLeft size={56} strokeWidth={3} />
          </button>

          <div className="video-viewport">
            <video
              ref={videoRef}
              className="video"
              src="/vid.mp4"
              playsInline
              preload="metadata"
            />

            {/* barra inferior + botões como no print */}
            <div className="overlay">
              <button
                className="overlay-btn left"
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <div className="overlay-text">Clique para ativar o som</div>

              <button
                className="overlay-btn right"
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Ativar som" : "Desativar som"}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}