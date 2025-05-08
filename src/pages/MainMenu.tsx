
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, Import, HelpCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const MainMenu = () => {
  const navigate = useNavigate();

  const handleCamera = () => {
    // Request camera permission and navigate to processing page
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(() => {
          navigate('/camera');
        })
        .catch(error => {
          console.error('Camera permission denied:', error);
          alert('Camera permission is required to use this feature');
        });
    } else {
      alert('Camera not available on this device');
    }
  };

  const handleImport = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const imageFile = target.files[0];
        
        // Store the selected image in sessionStorage
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageData = e.target?.result as string;
          sessionStorage.setItem('selectedImage', imageData);
          navigate('/processing');
        };
        reader.readAsDataURL(imageFile);
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
            >
              <Camera size={20} />
              <span>Camera</span>
            </Button>
            
            <Button 
              onClick={handleImport}
              className="w-full h-14 bg-palm hover:bg-palm-dark text-white flex items-center justify-center gap-2"
            >
              <Import size={20} />
              <span>Import Image</span>
            </Button>
            
            <Button 
              onClick={() => navigate('/how-it-works')}
              className="w-full h-14 bg-secondary text-palm hover:bg-accent flex items-center justify-center gap-2"
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
