import { motion } from "framer-motion";
import { 
  RiHome5Line, 
  RiHome5Fill, 
  RiSparklingLine, 
  RiSparklingFill, 
  RiInformationLine, 
  RiInformationFill,
} from "react-icons/ri";

export default function Navbar({ page, navigate }) {
  const links = [
    { 
      id: "landing", 
      label: "Home", 
      iconOutline: <RiHome5Line className="text-xl" />, 
      iconFilled: <RiHome5Fill className="text-xl" /> 
    },
    { 
      id: "process", 
      label: "Transform", 
      iconOutline: <RiSparklingLine className="text-xl" />, 
      iconFilled: <RiSparklingFill className="text-xl" /> 
    },
    { 
      id: "about", 
      label: "About", 
      iconOutline: <RiInformationLine className="text-xl" />, 
      iconFilled: <RiInformationFill className="text-xl" /> 
    },
  ];

  return (
    <>
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4]/80 backdrop-blur-md border-b border-stone-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("landing")} className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 20 }}
              className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center"
            >
              <RiSparklingLine className="text-white text-lg" />
            </motion.div>
            <span className="font-display text-xl font-semibold tracking-tight text-stone-900">
              Morphix
            </span>
          </button>

          <div className="flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  page === link.id ? "text-stone-900" : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {page === link.id && (
                  <motion.div
                    layoutId="desktop-nav-pill"
                    className="absolute inset-0 bg-stone-100 rounded-full border border-stone-200"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("process")}
              className="ml-3 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-white rounded-full text-sm font-semibold transition-colors shadow-sm"
            >
              Try Free
            </motion.button>
          </div>
        </div>
      </nav>

      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#FAF8F4]/92 backdrop-blur-md border-b border-stone-200/50 h-14 flex items-center justify-between px-4">
        <button onClick={() => navigate("landing")} className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-amber-500 rounded-lg flex items-center justify-center">
            <RiSparklingLine className="text-white text-base" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-stone-900">
            Morphix
          </span>
        </button>
        
        <button
          onClick={() => navigate("process")}
          className="px-4 py-1.5 bg-amber-500 text-white rounded-full text-xs font-semibold shadow-sm"
        >
          Try Free
        </button>
      </header>

      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50 bg-[#fffaf0]/92 backdrop-blur-xl border border-stone-200/80 rounded-[22px] shadow-[0_18px_50px_rgba(28,25,23,0.12)] h-[70px] flex items-center justify-around px-2 pb-[max(env(safe-area-inset-bottom),0px)]">
        {links.map((link) => {
          const isActive = page === link.id;
          return (
            <button
              key={link.id}
              onClick={() => navigate(link.id)}
              className="relative flex flex-col items-center justify-center w-20 h-full rounded-xl transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute inset-x-1.5 inset-y-1.5 bg-gradient-to-b from-amber-100 to-amber-50 rounded-2xl border border-amber-200/70"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              <div className={`relative z-10 transition-transform duration-200 ${isActive ? "scale-110 text-amber-600" : "text-stone-400"}`}>
                {isActive ? link.iconFilled : link.iconOutline}
              </div>
              <span className={`relative z-10 text-[10px] font-semibold mt-1 transition-colors ${isActive ? "text-amber-700" : "text-stone-500"}`}>
                {link.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
