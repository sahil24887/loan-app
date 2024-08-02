import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography, Box } from '@mui/material';

function BusinessFinancials({ nextStep, prevStep }) {
  const [change, setChange] = useState('');
  const [taxDebt, setTaxDebt] = useState('');
  const [cashflowSupport, setCashflowSupport] = useState('');
  const [transactionAccounts, setTransactionAccounts] = useState('');

  const isNextDisabled = !change || !taxDebt || !cashflowSupport || !transactionAccounts;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Business Financials</Typography>
      <Typography variant="h6" gutterBottom>Tell us more about your business</Typography>
      
      <Box mb={2}>
        <FormControl component="fieldset">
          <Typography>Do you expect significant change to your business in the next 12 months?</Typography>
          <RadioGroup row value={change} onChange={(e) => setChange(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mb={2}>
        <FormControl component="fieldset">
          <Typography>Do you have a tax debt?</Typography>
          <RadioGroup row value={taxDebt} onChange={(e) => setTaxDebt(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mb={2}>
        <FormControl component="fieldset">
          <Typography>Do you rely on cashflow support from related entities to run your business or repay your liabilities?</Typography>
          <RadioGroup row value={cashflowSupport} onChange={(e) => setCashflowSupport(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mb={2}>
        <FormControl component="fieldset">
          <Typography>Do you have transaction accounts with other financial institutions?</Typography>
          <RadioGroup row value={transactionAccounts} onChange={(e) => setTransactionAccounts(e.target.value)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Box>

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

export default BusinessFinancials;
