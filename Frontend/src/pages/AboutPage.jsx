import { motion } from "framer-motion";
import {
  RiCodeSSlashLine, RiCpuLine, RiMailLine, RiShieldCheckLine,
  RiGithubLine, RiArrowRightLine
} from "react-icons/ri";

const techStack = [
  { icon: <RiCodeSSlashLine className="text-xl text-amber-500" />, name: "Asset Generation Service", desc: "Automated server-side processing running secure conversion models." },
  { icon: <RiCpuLine className="text-xl text-amber-500" />, name: "Conversion Engine", desc: "Precision image calculations for solid silhouette masks and boundary outlines." },
  { icon: <RiMailLine className="text-xl text-amber-500" />, name: "Automated Delivery", desc: "Secure email system sending all 3 generated formats as attachments on completion." },
  { icon: <RiShieldCheckLine className="text-xl text-amber-500" />, name: "Validation System", desc: "Checks image integrity, formats, and sizes to ensure error-free processing." },
];

const cvDetails = [
  {
    title: "Silhouette",
    color: "bg-stone-900 text-white",
    steps: [
      "Analyze input alpha channels",
      "Threshold luminance to form binary mask",
      "Flood-fill logo shapes into solid geometry",
      "Output transparent background silhouette",
    ],
  },
  {
    title: "Edge / Border",
    color: "bg-white border border-stone-200 text-stone-900",
    steps: [
      "Convert pixel colors to grayscale",
      "Apply soft blurring to minimize texture noise",
      "Detect and trace boundary outline coordinates",
      "Output clean monochrome outline maps",
    ],
  },
  {
    title: "Grayscale",
    color: "bg-stone-100 text-stone-700",
    steps: [
      "Load artwork into monochrome canvas channels",
      "Convert pixels to luminance-weighted values",
      "Retain original transparency details",
      "Save as balanced high-contrast image",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 max-w-4xl mx-auto px-6 pb-24 md:pb-20 text-left">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-amber-500 font-semibold text-sm tracking-widest uppercase mb-3">About</p>
        <h1 className="font-display text-5xl font-bold text-stone-900 mb-4">
          How Morphix works
        </h1>
        <p className="text-stone-500 text-lg leading-relaxed mb-16 max-w-2xl">
          Morphix is a smart asset creator — a high-performance conversion service generates three programmatic branding assets and delivers them directly to your email, with a clean interface handling uploads.
        </p>

        {/* CV Pipeline (Restored original cards layout) */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-8">Asset Pipeline</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {cvDetails.map((cv, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${cv.color} rounded-2xl p-6 shadow-sm`}
              >
                <h3 className="font-display text-lg font-bold mb-4">{cv.title}</h3>
                <ol className="space-y-2">
                  {cv.steps.map((s, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm opacity-80">
                      <span className="font-mono font-bold flex-shrink-0">{j + 1}.</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech stack (Restored original cards layout) */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-8">System Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {techStack.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 bg-white border border-stone-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  {t.icon}
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{t.name}</p>
                  <p className="text-stone-500 text-sm mt-0.5">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Privacy Overview */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-stone-900 mb-6">Security & Processing</h2>
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
            <p className="text-stone-750 leading-relaxed">
              For complete security, all file formatting takes place in short-lived server memory. Assets are directly emailed to the recipient on request and are immediately wiped from local processing queues. We do not store or catalogue your intellectual property.
            </p>
          </div>
        </section>

        {/* Footer link */}
        <div className="flex items-center gap-3 text-stone-500 text-sm border-t border-stone-100 pt-8 mt-12">
          <RiGithubLine className="text-lg" />
          <span>Full source code is available in the project repository.</span>
          <RiArrowRightLine />
        </div>
      </motion.div>
    </div>
  );
}
