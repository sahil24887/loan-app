import React, { useState } from 'react';
import LendingDetails from '../components/LendingDetails';
import BusinessFinancials from '../components/BusinessFinancials';
import AboutYou from '../components/AboutYou';
import Setup from '../components/Setup';
import Summary from '../components/Summary';

function LoanApplication() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  switch(step) {
    case 1:
      return <LendingDetails nextStep={nextStep} />;
    case 2:
      return <BusinessFinancials nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <AboutYou nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return <Summary nextStep={nextStep} prevStep={prevStep} />;
    case 5:
      return <Setup prevStep={prevStep} />;
    default:
      return <LendingDetails nextStep={nextStep} />;
  }
}

export default LoanApplication;
