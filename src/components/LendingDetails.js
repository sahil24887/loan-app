import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

function LendingDetails({ nextStep }) {
  const [business, setBusiness] = useState('');
  const [reason, setReason] = useState('');

  const isNextDisabled = !business || !reason;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Lending Details</Typography>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Select your business</InputLabel>
        <Select
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          label="Select your business"
        >
          <MenuItem value="">
            <em>Select your business</em>
          </MenuItem>
          <MenuItem value="partnerLtd">Partner LTD</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>What's the main reason you're taking out this loan?</InputLabel>
        <Select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          label="What's the main reason you're taking out this loan?"
        >
          <MenuItem value="">
            <em>What's the main reason you're taking out this loan?</em>
          </MenuItem>
          <MenuItem value="businessGrowth">Business Growth - Hire staff</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={nextStep}
        disabled={isNextDisabled}
        style={{ marginTop: '20px' }}
      >
        Next
      </Button>
    </div>
  );
}

export default LendingDetails;
