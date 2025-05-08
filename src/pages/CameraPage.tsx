
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const CameraPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    // Initialize camera
    let stream: MediaStream | null = null;

    const initCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsCameraReady(true);
          };
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Could not access camera');
        navigate('/main-menu');
      }
    };

    initCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [navigate]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current && isCameraReady) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame to the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const imageData = canvas.toDataURL('image/jpeg');
        
        // Store image in session storage
        sessionStorage.setItem('selectedImage', imageData);
        
        // Navigate to processing page
        navigate('/processing');
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-black">
        <div className="p-4">
          <Button 
            onClick={() => navigate('/main-menu')} 
            className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft size={20} />
          </Button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Video element for camera preview */}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="h-full w-full object-cover"
          />
          
          {/* Canvas for capturing images (hidden) */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Capture button */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <Button 
              onClick={captureImage}
              disabled={!isCameraReady}
              className="bg-white hover:bg-gray-200 rounded-full w-16 h-16 p-0"
            >
              <Camera size={24} className="text-palm" />
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CameraPage;
