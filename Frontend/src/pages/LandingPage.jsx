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

function SilhouettePreview() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-[28px] bg-stone-900 rotate-6" />
      <div className="absolute left-5 top-3 h-14 w-14 rounded-[20px] bg-stone-900 -rotate-12" />
      <div className="absolute right-2 top-8 h-10 w-10 rounded-[14px] bg-stone-900 rotate-12" />
      <div className="absolute bottom-2 left-7 h-9 w-9 rounded-full bg-stone-900" />
    </div>
  );
}

function BorderPreview() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-[28px] border-[3px] border-stone-900 rotate-6 bg-white" />
      <div className="absolute left-5 top-3 h-14 w-14 rounded-[20px] border-[3px] border-stone-900 -rotate-12 bg-white" />
      <div className="absolute right-2 top-8 h-10 w-10 rounded-[14px] border-[3px] border-stone-900 rotate-12 bg-white" />
      <div className="absolute bottom-2 left-7 h-9 w-9 rounded-full border-[3px] border-stone-900 bg-white" />
    </div>
  );
}

function GrayscalePreview() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-stone-200 via-stone-500 to-stone-800 rotate-6" />
      <div className="absolute left-5 top-3 h-14 w-14 rounded-[20px] bg-gradient-to-br from-white via-stone-400 to-stone-700 -rotate-12 opacity-90" />
      <div className="absolute right-2 top-8 h-10 w-10 rounded-[14px] bg-gradient-to-br from-stone-100 to-stone-700 rotate-12 opacity-90" />
      <div className="absolute bottom-2 left-7 h-9 w-9 rounded-full bg-gradient-to-br from-stone-50 to-stone-600 opacity-95" />
    </div>
  );
}

const previewCards = [
  {
    label: "Silhouette",
    bg: "bg-white",
    frame: "border border-stone-200",
    caption: "Solid filled brand shape",
    preview: <SilhouettePreview />,
  },
  {
    label: "Edge / Border",
    bg: "bg-white",
    frame: "border border-stone-200",
    caption: "Clean outline extraction",
    preview: <BorderPreview />,
  },
  {
    label: "Grayscale",
    bg: "bg-[linear-gradient(180deg,#f5f5f4_0%,#e7e5e4_100%)]",
    frame: "border border-stone-300/80",
    caption: "Contrast-balanced monochrome",
    preview: <GrayscalePreview />,
  },
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

        {/* Preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid gap-4 md:grid-cols-3"
        >
          {previewCards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`${card.bg} ${card.frame} rounded-[28px] p-6 md:p-8 flex flex-col items-center justify-between min-h-[250px] shadow-sm`}
            >
              <div className="flex h-[150px] w-full items-center justify-center rounded-[22px] bg-white/70">
                {card.preview}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm font-semibold tracking-wide text-stone-900">{card.label}</p>
                <p className="mt-1 text-xs text-stone-500">{card.caption}</p>
              </div>
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
