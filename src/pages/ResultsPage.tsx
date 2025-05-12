
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import PageTransition from '../components/PageTransition';

interface PredictionResult {
  type: string;
  confidence: number;
  allPredictions: Array<{
    className: string;
    probability: number;
  }>;
}

const palmDescriptions = [
  {
    name: "Khalas Date Palm",
    description: "Origin & Cultivation: Khalas is a widely grown cultivar in the Gulf region. It occupies a large portion of farmlands in Oman and is considered an original regional cultivar.\n\nFruit Characteristics: Khalas dates have a rich, sweet taste and are popular among consumers for their flavor and quality.\n\nSignificance: One of the most valued and expensive date varieties in the Gulf, Khalas is important to both local consumption and the date industry."
  },
  {
    name: "Fahal (Male Date Palm)",
    description: "Role in Cultivation: The male date palm, is essential for pollinating female palms. It produces pollen required for fruit formation.\n\nPollination Efficiency: One healthy male palm can effectively pollinate up to 50 female palms.\n\nSignificance: Although it does not produce fruit, the male palm is crucial for successful date cultivation."
  },
  {
    name: "Furid Date Palm",
    description: "Origin & Cultivation: Furid is a prominent Omani cultivar, widely cultivated in Oman and valued for its resilience during handling and transport.\n\nFruit Characteristics: Furid dates are recognized by their deep, dark brown color and slightly wrinkled skin. The flesh is soft with a mildly sweet flavor.\n\nSignificance: This variety is a staple in Omani agriculture and contributes significantly to the country's date production."
  },
  {
    name: "Qish-warad Date Palm",
    description: "Origin & Cultivation: Qish-warad is a traditional Omani variety grown in different parts of the country.\n\nFruit Characteristics: It produces reddish, sweet dates that are favored for fresh consumption and use in traditional foods.\n\nSignificance: This variety is culturally significant and adds to the diversity of Omani date palms."
  }
];

const ResultsPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  useEffect(() => {
    // Get image and prediction result from session storage
    const imageData = sessionStorage.getItem('selectedImage');
    const resultData = sessionStorage.getItem('predictionResult');
    
    if (!imageData || !resultData) {
      alert('No data found. Please take a new picture.');
      navigate('/main-menu');
      return;
    }
    
    setImage(imageData);
    setResult(JSON.parse(resultData));
  }, [navigate]);

  const getDetailedPalmDescription = (palmType: string) => {
    const normalizedType = palmType.toLowerCase();
    
    if (normalizedType.includes('khalas')) {
      return palmDescriptions.find(p => p.name.toLowerCase().includes('khalas'))?.description;
    } else if (normalizedType.includes('fahal')) {
      return palmDescriptions.find(p => p.name.toLowerCase().includes('fahal'))?.description;
    } else if (normalizedType.includes('furd') || normalizedType.includes('furid')) {
      return palmDescriptions.find(p => p.name.toLowerCase().includes('furid'))?.description;
    } else if (normalizedType.includes('qish')) {
      return palmDescriptions.find(p => p.name.toLowerCase().includes('qish'))?.description;
    } else {
      return "This does not appear to be one of the four palm tree types in our database.";
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
          <h1 className="text-2xl font-bold text-palm-dark text-center mb-6">DONE!</h1>
          
          {image && (
            <div className="w-full max-w-md mx-auto mb-6">
              <div className="rounded-lg overflow-hidden border-2 border-palm shadow-lg">
                <img 
                  src={image} 
                  alt="Analyzed palm"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          )}
          
          {result && (
            <div className="w-full max-w-md mx-auto bg-secondary p-4 rounded-lg animate-slide-up">
              <h2 className="text-xl font-bold text-palm-dark text-center mb-4">
                {result.type}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {getDetailedPalmDescription(result.type)}
              </p>
            </div>
          )}
          
          <div className="mt-auto pt-6">
            <Button 
              onClick={() => navigate('/main-menu')} 
              className="bg-palm hover:bg-palm-dark text-white flex items-center mx-auto"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Menu
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ResultsPage;
