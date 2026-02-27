export interface PredictionRecord {
  id: string;
  imageData: string;
  predictedClass: string;
  confidence: number;
  isExotic: boolean;
  timestamp: number;
  category?: string;
  riskLevel?: string;
  feedback?: boolean;
}

const STORAGE_KEY = "leather-predictions";

export function savePrediction(record: PredictionRecord): void {
  const existing = getPredictions();
  existing.unshift(record);
  if (existing.length > 50) existing.pop();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getPredictions(): PredictionRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function updatePredictionFeedback(id: string, feedback: boolean): void {
  const existing = getPredictions();
  const index = existing.findIndex(p => p.id === id);
  if (index !== -1) {
    existing[index].feedback = feedback;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }
}

export function deletePrediction(id: string): void {
  const existing = getPredictions().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function clearPredictions(): void {
  localStorage.removeItem(STORAGE_KEY);
}
