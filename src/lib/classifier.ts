import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Loader2, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { classifyLeather, type ClassificationResult } from "@/lib/classifier";
import { savePrediction } from "@/lib/storage";
import ResultCard from "@/components/ResultCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ["Bag", "Wallet", "Shoes", "Belt", "Other"];

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [category, setCategory] = useState<string>("Bag");
  const [predictionId, setPredictionId] = useState<string>("");

  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setUploadedFile(file); // 🔥 store original file

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const analyze = async () => {
    if (!uploadedFile) return;

    setLoading(true);

    try {
      const res = await classifyLeather(uploadedFile);

      const id = crypto.randomUUID();

      setResult(res);
      setPredictionId(id);

      savePrediction({
        id,
        imageData: image!,
        predictedClass: res.predictedClass,
        confidence: res.confidence,
        isExotic: res.isExotic,
        timestamp: Date.now(),
        category,
        riskLevel: res.riskLevel,
      });

    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setUploadedFile(null);
    setResult(null);
  };

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  }

  return (
    <div className="min-h-screen pb-20 px-4 pt-8">
      <h1 className="text-xl font-bold mb-1">Analyze Texture</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Capture or upload a leather texture for AI identification
      </p>

      <AnimatePresence mode="wait">
        {!image ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Product Category
              </label>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full bg-secondary border-none rounded-xl h-12">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upload Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className="glass-card p-10 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/40 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium">Tap to upload image</p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or WEBP — max 10MB
              </p>
            </div>

            {/* Camera Button */}
            <button
              onClick={() => cameraRef.current?.click()}
              className="w-full py-3.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />

            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Preview */}
            <div className="relative">
              <img
                src={image}
                alt="Preview"
                className="w-full aspect-[4/3] object-cover rounded-xl border border-border"
              />

              {!loading && (
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Analyze Button */}
            {!result && (
              <button
                onClick={analyze}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Texture...
                  </>
                ) : (
                  "Identify Leather"
                )}
              </button>
            )}

            {/* Result */}
            {result && (
              <ResultCard
                result={result}
                imageData={image}
                predictionId={predictionId}
              />
            )}

            {result && (
              <button
                onClick={reset}
                className="w-full py-3.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm"
              >
                Analyze Another
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
