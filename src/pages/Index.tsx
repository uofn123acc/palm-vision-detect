
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the welcome page
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
