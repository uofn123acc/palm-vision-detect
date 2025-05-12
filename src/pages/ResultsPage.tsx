
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

  const getPalmDescription = (palmType: string) => {
    switch (palmType.toLowerCase()) {
      case 'khalas':
        return "Khalas Palm: Known for its sweet dates and is one of the most commercially important date palm varieties.";
      case 'fahal':
        return "Fahal Palm: Male date palm variety, important for pollination in date palm cultivation.";
      case 'furd':
      case 'furid':
        return "Furid Palm: Recognizable by its distinctive fruit shape and is grown in many regions.";
      case 'qish ward':
      case 'qish-warad':
        return "Qish-warad Palm: Features unique characteristics and is valued for its ornamental qualities.";
      case 'not a palm tree':
        return "This does not appear to be one of the four palm tree types in our database.";
      default:
        return "Could not identify this palm type.";
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
              <p className="text-gray-700">
                {getPalmDescription(result.type)}
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
