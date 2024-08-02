import React, { useState } from 'react';
import { Button, FormControl, TextField, Typography } from '@mui/material';

function AboutYou({ nextStep, prevStep }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const isNextDisabled = !firstName || !lastName;

  return (
    <div>
      <Typography variant="h4" gutterBottom>About You</Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={prevStep} style={{ marginRight: '10px' }}>Back</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={nextStep}
          disabled={isNextDisabled}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default AboutYou;
