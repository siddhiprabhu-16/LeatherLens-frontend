export async function classifyLeather(file: File): Promise<ClassificationResult> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://leatherlens-backend.onrender.com/predict",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Backend failed");
    }

    const data = await response.json();

    return {
      predictedClass: data.prediction,
      confidence: Math.round(data.confidence * 100),
      isExotic: data.prediction !== "Non Exotic",
      allScores: [],
      riskLevel:
        data.confidence > 0.7 ? "High" :
        data.confidence > 0.5 ? "Medium" : "Low",
      explanation: "Prediction based on trained ML model."
    };

  } catch (error) {
    console.warn("Backend unavailable");

    return {
      predictedClass: "Error",
      confidence: 0,
      isExotic: false,
      allScores: [],
      riskLevel: "Low",
      explanation: "Backend not reachable."
    };
  }
}
