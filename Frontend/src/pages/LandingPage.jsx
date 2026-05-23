import { motion } from "framer-motion";
import { RiArrowRightLine, RiImageLine, RiMailSendLine, RiFlashlightLine, RiShieldCheckLine, RiZoomInLine } from "react-icons/ri";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const features = [
  {
    icon: <RiZoomInLine className="text-2xl text-amber-500" />,
    title: "Silhouette Extraction",
    desc: "Isolates the pure solid form of your logo, stripping away inner details to deliver a bold brand shape.",
  },
  {
    icon: <RiFlashlightLine className="text-2xl text-amber-500" />,
    title: "Edge Detection",
    desc: "Extracts every line and curve into a clean outline stroke, perfect for structural wireframes.",
  },
  {
    icon: <RiImageLine className="text-2xl text-amber-500" />,
    title: "Grayscale Render",
    desc: "Generates a balanced, contrast-preserved monochrome representation of your original artwork.",
  },
  {
    icon: <RiMailSendLine className="text-2xl text-amber-500" />,
    title: "Auto Email Delivery",
    desc: "All three processed versions are delivered straight to your inbox instantly—no download hassle.",
  },
  {
    icon: <RiShieldCheckLine className="text-2xl text-amber-500" />,
    title: "Format Validated",
    desc: "Supports PNG and JPG files up to 5 MB. Formats are validated instantly to ensure seamless processing.",
  },
];

const steps = [
  { n: "01", title: "Upload your logo", desc: "Drop a PNG or JPG — transparent logos and icons work best." },
  { n: "02", title: "Three transforms run", desc: "Silhouette, edge detection, and grayscale are generated in seconds." },
  { n: "03", title: "Results emailed to you", desc: "All three files arrive as attachments — ready to use." },
];

export default function LandingPage({ navigate }) {
  return (
    <div className="pt-16 pb-24 md:pb-12">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl text-left">
          <motion.div variants={item} className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-8">
            <RiFlashlightLine /> Computer Vision · Automated Delivery
          </motion.div>
          <motion.h1 variants={item} className="font-display text-6xl md:text-7xl font-bold leading-tight text-stone-900 mb-6">
            Transform logos.<br />
            <span className="text-amber-500">Instantly.</span>
          </motion.h1>
          <motion.p variants={item} className="text-xl text-stone-500 leading-relaxed mb-10 max-w-xl">
            Upload any logo. Morphix runs three computer vision transformations and emails all outputs to you — no manual steps.
          </motion.p>
          <motion.div variants={item} className="flex items-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("process")}
              className="flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-white rounded-full font-semibold text-base transition-colors shadow-md shadow-amber-200"
            >
              Start Transforming <RiArrowRightLine />
            </motion.button>
            <button
              onClick={() => {
                const element = document.getElementById("process-steps");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-7 py-3.5 bg-white border border-stone-200 hover:border-stone-300 text-stone-700 rounded-full font-semibold text-base transition-colors"
            >
              How it works
            </button>
          </motion.div>
        </motion.div>

        {/* Preview cards - Restored original 3-column layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-4"
        >
          {[
            { label: "Silhouette", bg: "bg-stone-900", color: "text-white", icon: "▲" },
            { label: "Edge / Border", bg: "bg-white border border-stone-200", color: "text-stone-900", icon: "△" },
            { label: "Grayscale", bg: "bg-stone-100", color: "text-stone-600", icon: "▲" },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`${card.bg} rounded-2xl p-8 flex flex-col items-center justify-center h-48 shadow-sm`}
            >
              <span className={`text-5xl ${card.color} mb-3 opacity-70`}>{card.icon}</span>
              <span className={`text-sm font-medium tracking-wide ${card.color} opacity-60`}>{card.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it works - Restored original structure with bright visible numbers */}
      <section id="process-steps" className="bg-white border-y border-stone-100 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14 text-left"
          >
            <p className="text-amber-500 font-semibold text-sm tracking-widest uppercase mb-3">Process</p>
            <h2 className="font-display text-4xl font-bold text-stone-900">Three steps. Done.</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Style fixed: changed text-stone-100 (almost invisible) to text-amber-500 (highly visible, beautiful brand color) */}
                <div className="font-display text-7xl font-bold text-amber-500 mb-4 leading-none">{s.n}</div>
                <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">{s.title}</h3>
                <p className="text-stone-500 leading-relaxed">{s.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 text-stone-200 text-2xl">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-amber-500 font-semibold text-sm tracking-widest uppercase mb-3">Features</p>
          <h2 className="font-display text-4xl font-bold text-stone-900">Built for precision.</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">{f.icon}</div>
              <h3 className="font-semibold text-stone-900 mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-stone-900 py-20 mx-6 mb-16 rounded-3xl max-w-6xl md:mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center px-6"
        >
          <h2 className="font-display text-5xl font-bold text-white mb-4">Ready to transform?</h2>
          <p className="text-stone-400 text-lg mb-10">Upload your logo and get all 3 outputs emailed to you in seconds.</p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("process")}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-full font-semibold text-lg transition-colors inline-flex items-center gap-2"
          >
            Upload a Logo <RiArrowRightLine />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-stone-100 flex justify-between items-center text-stone-400 text-sm">
        <span className="font-display font-semibold text-stone-700">Morphix</span>
        <span>Logo Processing & Email Delivery</span>
      </footer>
    </div>
  );
}
