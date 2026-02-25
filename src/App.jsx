import { useState } from "react";

import Header from "./components/Header";
import NewsArticleTop from "./components/NewsArticleTop";
import NewsVideo from "./components/NewsVideo";
import ArticleText from "./components/ArticleText";
import ImageCarousel from "./components/ImageCarousel";
import FeaturedImage from "./components/FeaturedImage";
import ArticleCTA from "./components/ArticleCTA";
import SectionStepsLegal from "./components/SectionStepsLegal";
import Footer from "./components/Footer";
import GovLoginModal from "./components/GovLoginModal";

export default function App() {
  const [open, setOpen] = useState(false);

  // aqui vamos guardar o retorno do CPF (payload vindo do modal)
  const [leadData, setLeadData] = useState(null);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Header />
      <NewsArticleTop />
      <NewsVideo />
      <ArticleText />
      <ImageCarousel />
      <ArticleCTA onOpenModal={openModal} />
      <FeaturedImage />
      <SectionStepsLegal onOpenModal={openModal} />
      <Footer />

      <GovLoginModal
        open={open}
        onClose={closeModal}
        onContinue={(payload) => {
          // payload pode ser só o cpf (string) OU um objeto (ex: { cpf, dados })
          setLeadData(payload);
          closeModal();

          // depois você define o que fazer:
          // - navegar pra outra página
          // - abrir próxima etapa
          // - renderizar um componente de confirmação
          console.log("LEAD DATA:", payload);
        }}
      />
    </>
  );
}