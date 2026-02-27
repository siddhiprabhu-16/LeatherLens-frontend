import { useState, useEffect } from "react";
import { Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getPredictions, deletePrediction, clearPredictions, type PredictionRecord } from "@/lib/storage";

export default function HistoryPage() {
  const [records, setRecords] = useState<PredictionRecord[]>([]);

  useEffect(() => {
    setRecords(getPredictions());
  }, []);

  const handleDelete = (id: string) => {
    deletePrediction(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClear = () => {
    clearPredictions();
    setRecords([]);
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen pb-20 px-4 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">History</h1>
          <p className="text-sm text-muted-foreground">
            {records.length} prediction{records.length !== 1 ? "s" : ""}
          </p>
        </div>
        {records.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-destructive font-medium px-3 py-1.5 rounded-lg bg-destructive/10"
          >
            Clear All
          </button>
        )}
      </div>

      {records.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <p className="text-muted-foreground text-sm">No predictions yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Upload an image to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {records.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass-card p-3 flex items-center gap-3"
              >
                <img
                  src={r.imageData}
                  alt={r.predictedClass}
                  className="w-14 h-14 rounded-lg object-cover border border-border shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {r.isExotic ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5 text-success shrink-0" />
                    )}
                    <span className="text-sm font-semibold truncate">
                      {r.predictedClass}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-medium uppercase">
                      {r.category || "General"}
                    </span>
                    <p className="text-[10px] text-muted-foreground">
                      {r.confidence}% · {formatDate(r.timestamp)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="p-2 rounded-lg hover:bg-destructive/10 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
