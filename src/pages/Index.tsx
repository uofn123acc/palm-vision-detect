
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the welcome page on app start
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
