import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // For Better Lifestyles, we don't need age verification
    // This component is kept for structure compatibility but won't show
    const hasVerified = localStorage.getItem('ageVerified');
    if (!hasVerified) {
      // Auto-verify for lifestyle products
      localStorage.setItem('ageVerified', 'true');
    }
  }, []);

  const handleVerification = (isOver21) => {
    if (isOver21) {
      localStorage.setItem('ageVerified', 'true');
    }
    setIsOpen(false);
  };

  // Don't render for Better Lifestyles
  return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader className="text-center">
          <DialogTitle>
            <img 
              src="/logo.png" 
              alt="Better Lifestyles" 
              className="mx-auto mb-4 h-12"
            />
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-gray-800">
            Are you over 18 years of age?
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 justify-center mt-6">
          <Button 
            variant="outline" 
            onClick={() => handleVerification(false)}
            className="px-8"
          >
            No
          </Button>
          <Button 
            onClick={() => handleVerification(true)}
            className="px-8 bg-emerald-600 hover:bg-emerald-700"
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;