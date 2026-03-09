import {
  AlertTriangle,
  ShieldAlert,
  Info,
  ThumbsUp,
  ThumbsDown,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ClassificationResult } from "@/lib/classifier";
import { updatePredictionFeedback } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { fetchProducts } from "@/lib/productSearch";

interface ResultCardProps {
  result: ClassificationResult;
  imageData: string;
  predictionId?: string;
}

export default function ResultCard({
  result,
  imageData,
  predictionId,
}: ResultCardProps) {

  const [showExplanation, setShowExplanation] = useState(false);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const handleFeedback = (val: boolean) => {
    setFeedback(val);
    if (predictionId) {
      updatePredictionFeedback(predictionId, val);
    }
  };

  /* Product recommendations */
  useEffect(() => {

    const loadProducts = async () => {

      if (!result?.predictedClass) return;

      setLoadingProducts(true);

      /* 🔥 Using VEGAN bag instead of leather bag */
      const query = `vegan ${result.predictedClass} bag price India`;

      try {
        const items = await fetchProducts(query);
        setProducts(items);
      } catch (err) {
        console.error("Product fetch failed", err);
      }

      setLoadingProducts(false);

    };

    loadProducts();

  }, [result.predictedClass]);


  const riskColors: Record<string,string> = {
    High: "text-destructive bg-destructive/10 border-destructive/20",
    Medium: "text-warning bg-warning/10 border-warning/20",
    Low: "text-success bg-success/10 border-success/20",
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 space-y-4"
    >

      {/* Risk Level */}
      <div className="space-y-2">

        <div
          className={`flex items-center gap-2 p-2 rounded-lg border ${
            riskColors[result.riskLevel]
          }`}
        >
          <ShieldAlert className="w-4 h-4 shrink-0" />

          <span className="text-sm font-bold">
            {result.riskLevel} Risk Level
          </span>
        </div>

        {result.isExotic && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0" />

            <p className="text-sm text-warning font-medium">
              Exotic leather detected — may require CITES certification.
            </p>
          </div>
        )}
      </div>


      {/* Image */}
      <div className="relative group">

        <img
          src={imageData}
          alt="Analyzed leather"
          className="w-full aspect-video rounded-xl object-cover border border-border"
        />

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-tr from-red-500 via-yellow-400 to-blue-500 rounded-xl mix-blend-overlay pointer-events-none"
            />
          )}
        </AnimatePresence>

      </div>


      {/* Explanation toggle */}
      <div className="flex items-center gap-2">

        <Switch
          id="explanation-mode"
          checked={showExplanation}
          onCheckedChange={setShowExplanation}
        />

        <Label
          htmlFor="explanation-mode"
          className="text-xs flex items-center gap-1 cursor-pointer"
        >
          <Eye className="w-3 h-3" />
          Show Model Explanation
        </Label>

      </div>


      {showExplanation && (
        <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg italic">
          {result.explanation ||
            "Heatmap indicates texture density and scale alignment patterns used for classification."}
        </p>
      )}


      {/* Prediction */}
      <div>

        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Most Likely
        </p>

        <div className="flex items-center justify-between">

          <h3 className="text-xl font-bold gradient-text">
            {result.predictedClass}
          </h3>

          <span className="text-sm font-semibold">
            {result.confidence}% confidence
          </span>

        </div>

        {result.confidence < 60 && (
          <p className="text-[10px] text-warning flex items-center gap-1">
            <Info className="w-3 h-3" />
            Uncertain result — visually similar to multiple categories.
          </p>
        )}

      </div>


      {/* Top predictions (safe version) */}
      {result.allScores?.length > 0 && (

        <div className="space-y-2">

          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Top Predictions
          </p>

          {result.allScores.slice(0,3).map((s,idx)=>(
            <div key={s.name} className="space-y-1">

              <div className="flex justify-between text-xs">
                <span className={idx===0?"font-bold text-primary":""}>
                  {idx+1}. {s.name}
                </span>

                <span>{s.score}%</span>
              </div>

              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{width:0}}
                  animate={{width:`${s.score}%`}}
                  transition={{duration:0.6}}
                  className="h-full bg-primary"
                />
              </div>

            </div>
          ))}

        </div>

      )}


      {/* Product Recommendations */}
      <div className="space-y-3 mt-6">

        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Market Price Comparison
        </p>

        {loadingProducts && (
          <p className="text-xs text-muted-foreground">
            Loading recommendations...
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">

          {products.slice(0,4).map((item,index)=>(
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary rounded-xl p-2 text-xs hover:shadow-md transition"
            >

              {item.pagemap?.cse_image?.[0]?.src && (
                <img
                  src={item.pagemap.cse_image[0].src}
                  alt={item.title}
                  className="rounded-md mb-2 aspect-square object-cover"
                />
              )}

              <p className="line-clamp-2 font-medium">
                {item.title}
              </p>

            </a>
          ))}

        </div>

      </div>


      {/* Feedback */}
      <div className="pt-2 border-t border-border/50">

        <p className="text-xs text-center text-muted-foreground mb-2">
          Was this prediction helpful?
        </p>

        <div className="flex justify-center gap-4">

          <Button
            size="sm"
            variant={feedback===true?"default":"outline"}
            className="h-8 gap-1"
            onClick={()=>handleFeedback(true)}
          >
            <ThumbsUp className="w-3 h-3"/> Yes
          </Button>

          <Button
            size="sm"
            variant={feedback===false?"destructive":"outline"}
            className="h-8 gap-1"
            onClick={()=>handleFeedback(false)}
          >
            <ThumbsDown className="w-3 h-3"/> No
          </Button>

        </div>

      </div>

    </motion.div>
  );
}
