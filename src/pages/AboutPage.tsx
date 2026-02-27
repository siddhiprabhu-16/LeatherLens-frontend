import { Shield, Info, BookOpen, ExternalLink, Scale, Cpu, Zap, Microscope, GraduationCap, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24 px-4 pt-8">
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold mb-2 text-foreground">LeatherLensAI</h1>
          <p className="text-sm text-muted-foreground italic">
            AI-Powered Texture Classification for Ethical Fashion
          </p>
        </header>

        <section className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3 text-primary">
            <Info className="w-6 h-6" />
            <h2 className="font-bold">What is This System?</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            LeatherLensAI is an AI-based visual screening application that uses computer vision and machine learning techniques to identify and classify leather textures from images. The system is designed to support ethical fashion practices by helping users detect exotic leather materials that may be protected under wildlife conservation regulations such as <strong>CITES</strong>.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            By analyzing the surface texture of uploaded images, the system applies artificial intelligence techniques to classify leather into different texture categories, helping users make informed decisions and promote ethical sourcing.
          </p>
        </section>

        <section className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3 text-amber-500">
            <Target className="w-6 h-6" />
            <h2 className="font-bold text-foreground">Trained Texture Categories</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            The current model is trained to recognize the following leather texture classes:
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {["Python-like", "Crocodile-like", "Ostrich-like", "Kangaroo-like", "Non-exotic"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs font-medium p-2 bg-secondary/50 rounded-lg border border-border">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3 text-blue-500">
            <Microscope className="w-6 h-6" />
            <h2 className="font-bold text-foreground">Analysis Details</h2>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Model Version</h3>
              <p className="text-sm">v1.0.0 (EfficientNet + XGBoost)</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Features Extracted</h3>
              <p className="text-sm">Deep texture features capturing fine-grained patterns, scales, and pore distributions.</p>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg text-xs font-medium border border-border">
              ⚠️ Important: This system is based on visual texture analysis ONLY. It does not perform biological, DNA, or chemical authentication.
            </div>
          </div>
        </section>

        <section className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3 text-warning">
            <Scale className="w-6 h-6" />
            <h2 className="font-bold text-foreground">CITES Protection</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The Convention on International Trade in Endangered Species of Wild Fauna and Flora (<strong>CITES</strong>) is an international agreement that regulates trade in wildlife species. Many exotic leather materials require proper permits for legal trade.
          </p>
          <div className="space-y-2">
            <p className="text-xs font-bold">Recommended Actions:</p>
            <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
              <li>Always verify the origin of exotic materials.</li>
              <li>Ensure products come with valid CITES certification where required.</li>
              <li>Consult local customs authorities before international travel.</li>
            </ul>
          </div>
          <a 
            href="https://cites.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-primary hover:underline"
          >
            Visit CITES Official Website <ExternalLink className="w-3 h-3" />
          </a>
        </section>

        <section className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3 text-purple-500">
            <GraduationCap className="w-6 h-6" />
            <h2 className="font-bold text-foreground">Research Background</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Developed as part of a postgraduate research project in Computer Science focusing on ethical fashion and AI. The research demonstrates how computer vision can support transparency in fashion supply chains.
          </p>
        </section>

        <section className="glass-card p-5 space-y-4">
          <div className="flex items-center gap-3 text-success">
            <Shield className="w-6 h-6" />
            <h2 className="font-bold text-foreground">Our Mission</h2>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We aim to provide transparency in the leather supply chain by empowering consumers and professionals with technology-driven visual assessment tools. Awareness is the first step toward ethical trade practices.
          </p>
        </section>

        <footer className="text-center pt-4 pb-8">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            LeatherLensAI v1.0.0 · Accuracy: ~83%
          </p>
        </footer>
      </div>
    </div>
  );
}
