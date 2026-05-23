import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./pages/LandingPage";
import ProcessPage from "./pages/ProcessPage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";

const PAGE_TO_PATH = {
  landing: "/",
  process: "/transform",
  about: "/about",
};

const PATH_TO_PAGE = {
  "/": "landing",
  "/transform": "process",
  "/about": "about",
};

export default function App() {
  const getPageFromLocation = () => PATH_TO_PAGE[window.location.pathname] || "landing";
  const [page, setPage] = useState(getPageFromLocation);

  useEffect(() => {
    const onPopState = () => setPage(getPageFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (nextPage) => {
    const path = PAGE_TO_PATH[nextPage] || "/";
    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
    setPage(nextPage);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body text-stone-800">
      <Navbar page={page} navigate={navigate} />
      <AnimatePresence mode="wait">
        {page === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            <LandingPage navigate={navigate} />
          </motion.div>
        )}
        {page === "process" && (
          <motion.div key="process" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            <ProcessPage />
          </motion.div>
        )}
        {page === "about" && (
          <motion.div key="about" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
            <AboutPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
