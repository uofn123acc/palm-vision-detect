
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import LoadingCircle from '../components/LoadingCircle';
import PageTransition from '../components/PageTransition';
import { predictPalmType } from '../services/teachableMachineService';

const ProcessingPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const processImage = async () => {
      try {
        // Get image from session storage
        const imageData = sessionStorage.getItem('selectedImage');
        if (!imageData) {
          throw new Error('No image selected');
        }
        
        // Create an image element to use for prediction
        const img = new Image();
        img.src = imageData;
        
        // Wait for image to load
        await new Promise((resolve) => {
          img.onload = resolve;
        });
        
        // Wait a moment to show the loading state (for demo purposes)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Predict palm type
        const result = await predictPalmType(img);
        
        // Store result in session storage
        sessionStorage.setItem('predictionResult', JSON.stringify(result));
        
        // Navigate to results page
        navigate('/results');
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process image. Please try again.');
        navigate('/main-menu');
      }
    };

    processImage();
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="p-4">
          <Button 
            onClick={() => navigate('/main-menu')} 
            className="bg-palm hover:bg-palm-dark text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <LoadingCircle className="scale-150" />
          
          <div className="mt-8">
            <p className="text-center text-lg font-medium text-palm">Please wait, processing</p>
          </div>
          
          {/* Show the selected image as thumbnail */}
          <div className="mt-12 w-32 h-32 rounded-lg overflow-hidden border-2 border-palm">
            {sessionStorage.getItem('selectedImage') && (
              <img 
                src={sessionStorage.getItem('selectedImage') || ''} 
                alt="Selected palm"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProcessingPage;
