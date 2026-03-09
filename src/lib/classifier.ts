export async function classifyLeather(file: File): Promise<ClassificationResult> {

  const formData = new FormData()
  formData.append("image", file)

  try {

    const response = await fetch(
      "https://leatherlens-backend.onrender.com/predict",
      {
        method: "POST",
        body: formData
      }
    )

    if (!response.ok) {
      throw new Error("Backend failed")
    }

    const data = await response.json()

    const confidencePercent = Math.round(data.confidence * 100)

    return {
      predictedClass: data.prediction,
      confidence: confidencePercent,
      isExotic: data.prediction !== "Non Exotic",
      allScores: [],
      riskLevel:
        confidencePercent > 80 ? "High" :
        confidencePercent > 60 ? "Medium" : "Low",
      explanation: "Prediction generated using the LeatherLens AI model."
    }

  } catch (error) {

    console.warn("Backend unavailable", error)

    return {
      predictedClass: "Error",
      confidence: 0,
      isExotic: false,
      allScores: [],
      riskLevel: "Low",
      explanation: "Backend not reachable."
    }

  }
}
