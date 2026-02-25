import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
import StepIncome from "./pages/StepIncome";
import StepCnh from "./pages/StepCnh";

function Home({ openModal }) {
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
    </>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home openModal={openModal} />} />

        <Route path="/stepname" element={<StepName />} />
        <Route path="/stepbirth" element={<StepBirth />} />
        <Route path="/stepmother" element={<StepMother />} />

        <Route path="/stepincome" element={<StepIncome />} />
        <Route path="/stepcnh" element={<StepCnh />} />
      </Routes>

      <GovLoginModal
        open={open}
        onClose={closeModal}
        onContinue={(payload) => {
          closeModal();
          navigate("/stepname", { state: payload });
        }}
      />
    </>
  );
}