import React from 'react';
import { Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Summary({ nextStep, prevStep }) {
  const navigate = useNavigate();
  const handleCancel = () => {
    Swal.fire({
      title: 'Consent Cancelled',
      text: 'You have cancelled the consent.',
      icon: 'info',
      confirmButtonText: 'OK'
    }).then(() => {
      prevStep();
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Consent page</Typography>
      <Typography variant="h6" gutterBottom>Please note: For demo purposes, we have implemented programatc consent using AIS Sandbox. When you press on Approve, we will go ahead and fetch your data from sandbox</Typography>
    
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={prevStep} style={{ marginRight: '10px' }}>Back</Button>
        <Button variant="contained" color="primary" onClick={nextStep}>Accept</Button>
        <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
      </div>
    </div>
  );
}

export default Summary;
