
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PageTransition from '../components/PageTransition';

const palmTypes = [
  {
    name: "Khalas Date Palm",
    image: "https://www.mdpi.com/plants/plants-10-00638/article_deploy/html/images/plants-10-00638-g001.png",
    description: "Origin & Cultivation: Khalas is a widely grown cultivar in the Gulf region. It occupies a large portion of farmlands in Oman and is considered an original regional cultivar.\n\nFruit Characteristics: Khalas dates have a rich, sweet taste and are popular among consumers for their flavor and quality.\n\nSignificance: One of the most valued and expensive date varieties in the Gulf, Khalas is important to both local consumption and the date industry."
  },
  {
    name: "Fahal (Male Date Palm)",
    image: "https://www.mdpi.com/agriculture/agriculture-11-00740/article_deploy/html/images/agriculture-11-00740-g001.png",
    description: "Role in Cultivation: The male date palm, is essential for pollinating female palms. It produces pollen required for fruit formation.\n\nPollination Efficiency: One healthy male palm can effectively pollinate up to 50 female palms.\n\nSignificance: Although it does not produce fruit, the male palm is crucial for successful date cultivation."
  },
  {
    name: "Fardh Date Palm",
    image: "https://www.mdpi.com/plants/plants-11-01441/article_deploy/html/images/plants-11-01441-g001.png",
    description: "Origin & Cultivation: Fardh is a prominent Omani cultivar, widely cultivated in Oman and valued for its resilience during handling and transport.\n\nFruit Characteristics: Fardh dates are recognized by their deep, dark brown color and slightly wrinkled skin. The flesh is soft with a mildly sweet flavor.\n\nSignificance: This variety is a staple in Omani agriculture and contributes significantly to the country's date production."
  },
  {
    name: "Qash al-Ward Date Palm",
    image: "https://www.mdpi.com/plants/plants-11-01441/article_deploy/html/images/plants-11-01441-g004.png",
    description: "Origin & Cultivation: Qash al-Ward is a traditional Omani variety grown in different parts of the country.\n\nFruit Characteristics: It produces reddish, sweet dates that are favored for fresh consumption and use in traditional foods.\n\nSignificance: This variety is culturally significant and adds to the diversity of Omani date palms."
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
              Our model was trained on thousands of images to accurately identify the four most common palm tree types in Oman—Khalas, Fahal, Furd, and Qish Ward—or to confidently detect when an image is not a palm tree at all.
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
            <h2 className="text-xl font-semibold text-palm mb-4">Palm Tree Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {palmTypes.map((palm) => (
                <Card key={palm.name} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={palm.image} 
                        alt={palm.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-palm-dark mb-1">{palm.name}</h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{palm.description}</p>
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
