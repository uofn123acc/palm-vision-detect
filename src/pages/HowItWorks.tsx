
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PageTransition from '../components/PageTransition';

const palmTypes = [
  {
    name: "Khalas Date Palm",
    image: "/lovable-uploads/1249fe97-a006-4c4b-9040-cc1a5d40889a.png",
    description: "Origin & Cultivation: Khalas is a widely grown cultivar in the Gulf region. It occupies a large portion of farmlands in Oman and is considered an original regional cultivar.\n\nFruit Characteristics: Khalas dates have a rich, sweet taste and are popular among consumers for their flavor and quality.\n\nSignificance: One of the most valued and expensive date varieties in the Gulf, Khalas is important to both local consumption and the date industry."
  },
  {
    name: "Fahal (Male Date Palm)",
    image: "/lovable-uploads/6ef0ff68-3741-46a5-89dc-9821eebb0ba1.png",
    description: "Role in Cultivation: The male date palm, is essential for pollinating female palms. It produces pollen required for fruit formation.\n\nPollination Efficiency: One healthy male palm can effectively pollinate up to 50 female palms.\n\nSignificance: Although it does not produce fruit, the male palm is crucial for successful date cultivation."
  },
  {
    name: "Furid Date Palm",
    image: "/lovable-uploads/91c9cb29-749c-4e2f-8880-ecf564ac7fcc.png",
    description: "Origin & Cultivation: Furid is a prominent Omani cultivar, widely cultivated in Oman and valued for its resilience during handling and transport.\n\nFruit Characteristics: Furid dates are recognized by their deep, dark brown color and slightly wrinkled skin. The flesh is soft with a mildly sweet flavor.\n\nSignificance: This variety is a staple in Omani agriculture and contributes significantly to the country's date production."
  },
  {
    name: "Qish-warad Date Palm",
    image: "/lovable-uploads/2458a01b-2e97-40f2-b631-63e1084be7fd.png",
    description: "Origin & Cultivation: Qish-warad is a traditional Omani variety grown in different parts of the country.\n\nFruit Characteristics: It produces reddish, sweet dates that are favored for fresh consumption and use in traditional foods.\n\nSignificance: This variety is culturally significant and adds to the diversity of Omani date palms."
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <div className="p-4">
          <Button 
            onClick={() => navigate('/main-menu')} 
            className="bg-palm hover:bg-palm-dark text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-palm-dark mb-6">How Palm Vision Works</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-palm mb-3">About the App</h2>
            <p className="mb-4">
              Palm Vision uses machine learning technology to identify four different types of palm trees from images. 
              The app helps farmers, botanists, researchers, and anyone interested in palm trees to quickly identify palm varieties.
            </p>
            <p>
              Our model was trained on thousands of images to accurately identify the four most common palm tree types in Oman—Khalas, Fahal, Furid, and Qish-warad—or to confidently detect when an image is not a palm tree at all.
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-palm mb-3">How to Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-palm-dark">Camera</h3>
                <p>Take a clear photo of a palm tree. Make sure the tree is well-lit and centered in the frame.</p>
              </div>
              <div>
                <h3 className="font-medium text-palm-dark">Import Image</h3>
                <p>Select an existing photo from your gallery to analyze.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-palm mb-6">Palm Tree Types</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {palmTypes.map((palm) => (
                <Card key={palm.name} className="overflow-hidden shadow-md">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] relative bg-white">
                      <img 
                        src={palm.image} 
                        alt={palm.name} 
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-palm-dark mb-2">{palm.name}</h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{palm.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HowItWorks;
