import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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

import StepName from "./pages/StepName";
import StepBirth from "./pages/StepBirth";
import StepMother from "./pages/StepMother";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomeLayout />} />
        <Route path="/nome" element={<StepName />} />
        <Route path="/nascimento" element={<StepBirth />} />
        <Route path="/mae" element={<StepMother />} />

      </Routes>

    </BrowserRouter>

  );
}

function HomeLayout() {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

          closeModal();

          // Navega para página do nome
          navigate("/nome", { state: payload });

        }}
      />
    </>
  );
}