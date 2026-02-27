import { Camera, Shield, History, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: Camera, title: "Capture & Upload", desc: "Take a photo or upload from gallery" },
  { icon: Zap, title: "AI Classification", desc: "Instant leather texture analysis" },
  { icon: Shield, title: "Exotic Detection", desc: "Identify regulated leather types" },
  { icon: History, title: "Offline History", desc: "All results stored locally" },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20 px-4">
      {/* Header */}
      <div className="pt-20 pb-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold tracking-tight mb-3"
        >
          LeatherLens <span className="gradient-text">AI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-base max-w-xs mx-auto"
        >
          Classify exotic leather textures instantly using AI-powered image analysis
        </motion.p>
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/upload")}
        className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base glow-amber mb-8 transition-transform"
      >
        Start Analysis
      </motion.button>

      {/* Features */}
      <div className="grid grid-cols-2 gap-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="glass-card p-4 space-y-2"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <f.icon className="w-4.5 h-4.5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
