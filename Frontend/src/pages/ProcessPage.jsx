import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiUploadCloud2Line, RiImageLine, RiMailCheckLine, RiCheckLine,
  RiErrorWarningLine, RiLoader4Line, RiDownload2Line, RiRefreshLine
} from "react-icons/ri";
import { buildApiUrl } from "../config/api";

const OUTPUT_LABELS = [
  { key: "silhouette", label: "Silhouette", desc: "Solid filled shape" },
  { key: "border", label: "Edge / Border", desc: "Outline strokes only" },
  { key: "grayscale", label: "Grayscale", desc: "Luminance conversion" },
];

export default function ProcessPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFile = (f) => {
    if (!f) return;
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowed.includes(f.type)) {
      setError("Only PNG and JPG files are accepted.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      return;
    }
    setError("");
    setFile(f);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(f));
    setResults(null);
    setStatus("idle");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) { setError("Please select an image first."); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("uploading");
    setError("");
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("recipient_email", email);

      const res = await fetch(buildApiUrl("/process"), { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Processing failed.");
      setResults(data);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please check your internet connection and try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setEmail("");
    setStatus("idle");
    setResults(null);
    setError("");
  };

  return (
    <div className="pt-24 min-h-screen max-w-4xl mx-auto px-6 pb-24 md:pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-10 text-left">
          <p className="text-amber-500 font-semibold text-sm tracking-widest uppercase mb-2">Transform</p>
          <h1 className="font-display text-4xl font-bold text-stone-900 mb-2">Upload your logo</h1>
          <p className="text-stone-500">PNG or JPG · Max 5 MB · Transparent logos work best</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: upload + form */}
          <div className="space-y-5 text-left">
            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all h-52 flex flex-col items-center justify-center gap-3
                ${dragOver ? "border-amber-400 bg-amber-50" : "border-stone-200 bg-white hover:border-amber-300 hover:bg-amber-50/40"}`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {preview ? (
                <img src={preview} alt="preview" className="h-36 object-contain rounded-lg" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                    <RiUploadCloud2Line className="text-amber-500 text-2xl" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-stone-700">Drop your logo here</p>
                    <p className="text-stone-400 text-sm">or click to browse</p>
                  </div>
                </>
              )}
            </div>

            {file && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3">
                <RiImageLine className="text-amber-500 text-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-800 truncate">{file.name}</p>
                  <p className="text-xs text-stone-400">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); reset(); }} className="text-stone-400 hover:text-stone-600">✕</button>
              </motion.div>
            )}

            {/* Email input */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">Recipient email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white text-sm"
              />
              <p className="text-xs text-stone-400 mt-1.5">All 3 outputs will be emailed here automatically.</p>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                >
                  <RiErrorWarningLine className="text-red-500 text-lg flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: status === "uploading" ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={status === "success" ? reset : handleSubmit}
              disabled={status === "uploading"}
              className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-colors
                ${status === "uploading" ? "bg-amber-300 cursor-not-allowed"
                  : status === "success" ? "bg-stone-700 hover:bg-stone-600"
                  : "bg-amber-500 hover:bg-amber-400"}`}
            >
              {status === "uploading" && <RiLoader4Line className="animate-spin" />}
              {status === "success" && <RiRefreshLine />}
              {status === "uploading" ? "Processing..." : status === "success" ? "Process Another" : "Transform Logo"}
            </motion.button>
          </div>

          {/* Right: results cards layout (Restored original design) */}
          <div className="text-left">
            <AnimatePresence mode="wait">
              {status === "idle" || status === "error" ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16 text-stone-300"
                >
                  <RiImageLine className="text-6xl mb-4" />
                  <p className="text-stone-400 font-medium">Results will appear here</p>
                  <p className="text-stone-300 text-sm mt-1">Upload a logo and hit Transform</p>
                </motion.div>
              ) : status === "uploading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center py-16 gap-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-14 h-14 border-4 border-amber-200 border-t-amber-500 rounded-full"
                  />
                  <div className="text-center">
                    <p className="font-medium text-stone-700">Running transformations…</p>
                    <p className="text-stone-400 text-sm mt-1">Silhouette · Edge · Grayscale</p>
                  </div>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-48 h-2 bg-stone-100 rounded-full overflow-hidden"
                      style={{ opacity: 1 - i * 0.2 }}
                    >
                      <motion.div
                        className="h-full bg-amber-400 rounded-full"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Email sent banner */}
                  <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <RiMailCheckLine className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-green-800 font-semibold text-sm">
                        {results?.email_status === "sent" ? "Email sent!" : "Processing complete"}
                      </p>
                      <p className="text-green-600 text-xs">
                        {results?.email_status === "sent"
                          ? `3 outputs delivered to ${results?.recipient_email || email}`
                          : `Email status: ${results?.email_status}`}
                      </p>
                    </div>
                  </div>

                  {/* Output cards (Original design restored) */}
                  {OUTPUT_LABELS.map((out, i) => (
                    <motion.div
                      key={out.key}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white border border-stone-100 rounded-2xl p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                            <RiCheckLine className="text-green-500" />
                          </div>
                          <div>
                            <p className="font-medium text-stone-800 text-sm">{out.label}</p>
                            <p className="text-stone-400 text-xs">{out.desc}</p>
                          </div>
                        </div>
                        <a
                          href={buildApiUrl(results?.downloads?.[out.key] || `/download/${out.key}`)}
                          download={`${out.key}.png`}
                          className="flex items-center gap-1.5 text-amber-600 hover:text-amber-500 text-sm font-medium"
                        >
                          <RiDownload2Line /> Download
                        </a>
                      </div>

                      <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-3">
                        <img
                          src={buildApiUrl(results?.downloads?.[out.key] || `/download/${out.key}`)}
                          alt={`${out.label} preview`}
                          className="h-40 w-full rounded-lg object-contain bg-white"
                        />
                      </div>
                    </motion.div>
                  ))}

                  <p className="text-xs text-stone-400 text-center pt-2">
                    Files are also attached in your email ✦
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
