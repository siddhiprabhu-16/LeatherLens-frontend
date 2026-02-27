export interface ClassificationResult {
  predictedClass: string;
  confidence: number;
  isExotic: boolean;
  allScores: { name: string; score: number }[];
  riskLevel: "High" | "Medium" | "Low";
  explanation?: string;
}

const CLASSES = [
  { name: "Crocodile", exotic: true },
  { name: "Python", exotic: true },
  { name: "Ostrich", exotic: true },
  { name: "Kangaroo", exotic: true },
  { name: "Non-Exotic", exotic: false },
];

export async function classifyLeather(category?: string): Promise<ClassificationResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1500));

  // Generate random scores
  const rawScores = CLASSES.map(() => Math.random());
  const sum = rawScores.reduce((a, b) => a + b, 0);
  const scores = rawScores.map((s) => s / sum);

  const sortedIndices = scores
    .map((s, i) => i)
    .sort((a, b) => scores[b] - scores[a]);
  
  const maxIdx = sortedIndices[0];
  const chosen = CLASSES[maxIdx];
  const confidence = Math.round(scores[maxIdx] * 100);

  let riskLevel: "High" | "Medium" | "Low" = "Low";
  if (chosen.exotic) {
    riskLevel = confidence > 70 ? "High" : "Medium";
  } else if (confidence < 60) {
    riskLevel = "Medium";
  }

  const allScores = sortedIndices.map((i) => ({
    name: CLASSES[i].name,
    score: Math.round(scores[i] * 100),
  }));

  return {
    predictedClass: chosen.name,
    confidence,
    isExotic: chosen.exotic,
    allScores,
    riskLevel,
    explanation: `The model focused on the ${category || "texture"} patterns and scale distribution typical of ${chosen.name} leather.`,
  };
}
