
// This service handles the Teachable Machine model for palm tree classification

let model: any = null;
const modelURL = 'https://teachablemachine.withgoogle.com/models/ubn5baF9x/';

// Load the model
export const loadModel = async () => {
  try {
    // Dynamically import the teachable machine library
    const tmImage = await import('@teachablemachine/image');
    
    // Load the model
    model = await tmImage.load(
      `${modelURL}model.json`,
      `${modelURL}metadata.json`
    );
    
    return true;
  } catch (error) {
    console.error('Failed to load model:', error);
    return false;
  }
};

// Predict the palm tree type from an image
export const predictPalmType = async (imageElement: HTMLImageElement) => {
  if (!model) {
    try {
      await loadModel();
    } catch (error) {
      console.error('Error loading model:', error);
      throw new Error('Model could not be loaded');
    }
  }

  try {
    // Get prediction
    const prediction = await model.predict(imageElement);
    
    // Find the class with highest probability
    let highestProbability = 0;
    let predictedClass = '';
    
    prediction.forEach((p: { className: string, probability: number }) => {
      if (p.probability > highestProbability) {
        highestProbability = p.probability;
        predictedClass = p.className;
      }
    });
    
    return {
      type: predictedClass,
      confidence: highestProbability,
      allPredictions: prediction
    };
  } catch (error) {
    console.error('Error during prediction:', error);
    throw new Error('Error during image classification');
  }
};
