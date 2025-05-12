
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera, SwitchCamera, Image, Focus } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { toast } from '@/components/ui/sonner';

const CameraPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize camera
    initCamera();

    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const initCamera = async () => {
    try {
      // Stop previous stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      // Get new stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          setIsCameraReady(true);
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Could not access camera');
      navigate('/main-menu');
    }
  };

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

  const switchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const handleFocus = async (event: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !streamRef.current) return;

    try {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      
      // Check if focus capability is available
      const capabilities = videoTrack.getCapabilities();
      if (!capabilities.focusDistance && !capabilities.focusMode) {
        // Focus not supported
        toast.info("Manual focus not supported on this device");
        return;
      }

      // Get click coordinates relative to the video element
      const rect = videoRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      // Apply focus if supported
      const constraints = {
        advanced: [{ 
          focusMode: "manual",
          focusDistance: 0, // Try to focus on the clicked area
          pointsOfInterest: [{ x, y }]
        }]
      };

      await videoTrack.applyConstraints(constraints);
      
      // Show focus animation
      const focusElement = document.createElement('div');
      focusElement.className = 'absolute w-12 h-12 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse';
      focusElement.style.left = `${event.clientX}px`;
      focusElement.style.top = `${event.clientY}px`;
      
      if (event.currentTarget) {
        event.currentTarget.appendChild(focusElement);
        
        // Remove focus indicator after animation
        setTimeout(() => {
          if (focusElement.parentNode) {
            focusElement.parentNode.removeChild(focusElement);
          }
        }, 1000);
      }
      
    } catch (error) {
      console.error('Focus error:', error);
    }
  };

  const openGallery = () => {
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
      <div className="min-h-screen flex flex-col bg-black">
        <div className="p-4 flex justify-between items-center">
          <Button 
            onClick={() => navigate('/main-menu')} 
            className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="flex gap-2">
            <Button 
              onClick={switchCamera} 
              className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
            >
              <SwitchCamera size={20} />
            </Button>
            
            <Button 
              onClick={openGallery} 
              className="bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
            >
              <Image size={20} />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Video element for camera preview with focus capability */}
          <div 
            className="relative h-full w-full" 
            onClick={handleFocus}
          >
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="h-full w-full object-cover"
            />
            
            {/* Focus indicator */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Focus elements will be created dynamically */}
            </div>
          </div>
          
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
