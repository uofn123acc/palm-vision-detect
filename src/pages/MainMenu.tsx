
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, Import, HelpCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { toast } from 'sonner';

const MainMenu = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCamera = () => {
    // Request camera permission and navigate to processing page
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          navigate('/camera');
        })
        .catch(error => {
          console.error('Camera permission denied:', error);
          toast.error('Camera permission is required to use this feature');
        });
    } else {
      toast.error('Camera not available on this device');
    }
  };

  const compressImage = (imageFile: File, maxWidth = 800): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        
        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          
          // Draw resized image to canvas
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Get compressed image as data URL with reduced quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
    });
  };

  const handleImport = () => {
    if (isProcessing) return;
    
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (event) => {
      try {
        setIsProcessing(true);
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const imageFile = target.files[0];
          
          // Compress the image before storing
          const compressedImage = await compressImage(imageFile);
          
          try {
            // Try to store in sessionStorage
            sessionStorage.setItem('selectedImage', compressedImage);
            navigate('/processing');
          } catch (error) {
            console.error('Storage error:', error);
            toast.error('Image is too large. Please try a smaller image.');
          }
        }
      } catch (error) {
        console.error('Error processing image:', error);
        toast.error('Failed to process image');
      } finally {
        setIsProcessing(false);
      }
    };
    
    // Trigger the file input click
    input.click();
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-palm-dark mb-2">Palm Vision</h1>
            <p className="text-palm">Identify palm tree varieties with your camera</p>
          </div>
          
          <div className="space-y-6">
            <Button 
              onClick={handleCamera}
              className="w-full h-14 bg-palm hover:bg-palm-dark text-white flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              <Camera size={20} />
              <span>Camera</span>
            </Button>
            
            <Button 
              onClick={handleImport}
              className="w-full h-14 bg-palm hover:bg-palm-dark text-white flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              <Import size={20} />
              <span>{isProcessing ? 'Processing...' : 'Import Image'}</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/how-it-works')}
              className="w-full h-14 bg-secondary text-palm hover:bg-accent flex items-center justify-center gap-2"
              disabled={isProcessing}
            >
              <HelpCircle size={20} />
              <span>How It Works</span>
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MainMenu;
