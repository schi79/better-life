import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already been verified
    const hasVerified = localStorage.getItem('ageVerified');
    if (!hasVerified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerification = (isOver21) => {
    if (isOver21) {
      localStorage.setItem('ageVerified', 'true');
      setIsOpen(false);
    } else {
      // Redirect away if under 21
      window.location.href = 'https://www.google.com';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}} className="z-[100]">
      <DialogContent className="sm:max-w-[425px] bg-white" hideClose={true}>
        <DialogHeader className="text-center">
          <DialogTitle className="flex flex-col items-center">
            <div className="text-2xl font-bold text-gray-800 mb-4">
              Better Lifestyles
            </div>
          </DialogTitle>
          <DialogDescription className="text-lg font-medium text-gray-800">
            Are you over 21 years of age?
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