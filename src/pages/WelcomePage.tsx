
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingCircle from '../components/LoadingCircle';
import PageTransition from '../components/PageTransition';
import { loadModel } from '../services/teachableMachineService';

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load the teachable machine model
        await loadModel();
        
        // Wait for 3 seconds for demonstration purposes
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Navigate to main menu
        navigate('/main-menu');
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, [navigate]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          <LoadingCircle className="scale-150" />
          
          <div className="animate-fade-in mt-8">
            <p className="text-center text-lg font-medium text-palm">Welcome To Palm Vision, please wait</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default WelcomePage;
