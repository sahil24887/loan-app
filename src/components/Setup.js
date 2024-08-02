import React, { useState, useEffect } from 'react';
import { Button, FormControl, Typography, TextField, Box, Grid } from '@mui/material';

function Setup({ prevStep }) {
  const [amount, setAmount] = useState('');
  const [count, setCount] = useState(1);
  const [rate, setRate] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [rateError, setRateError] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [accountId, setAccountId] = useState('');
  const [token, setToken] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [fees, setFees] = useState(0);
  const [averageTransactionPerMonth, setAverageTransactionPerMonth] = useState(0);
  const [dailyRepayments, setDailyRepayments] = useState(0);
  const [estimatedTerm, setEstimatedTerm] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    const amountNum = parseFloat(amount);
    const rateNum = parseFloat(rate);
    const rateSum = (amountNum * rateNum) / 100;
    const sum = amountNum + rateSum;
    setTotalAmount(sum);
    setFees(rateSum);

    if (accountId && token) {
      try {
        const response = await fetch(`http://10.200.1.4:8080/accounts/${accountId}/transactions`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.AverageTransactionPerMonth) {
          setAverageTransactionPerMonth(data.AverageTransactionPerMonth);
          setDailyRepayments(data.AverageTransactionPerMonth / 30); 
          setEstimatedTerm(Math.ceil(sum / data.AverageTransactionPerMonth));
        } else {
          console.log('No AverageTransactionPerMonth found in response');
        }
        console.log("Transactions Data:", data);
        
      } catch (error) {
        setApiError(error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.200.1.4:8080/accounts-chain');
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const authToken = data.token;
        if (authToken) {
          console.log('Auth Token found:', authToken);
          setToken(authToken);
        } else {
          console.log('No token found in response body');
        }

        if (data.Data && data.Data.Account && data.Data.Account.length > 0) {
          setAccountId(data.Data.Account[0].AccountId);
        }
      } catch (error) {
        setApiError(error.message);
      }
    };

    fetchData();
  }, []);

  const generateRandomNumbers = () => {
    let currentTotalAmount = 0;
    let currentFees = 0;
    let currentDailyRepayments = 0;
    let currentEstimatedTerm = 1;
    setLoading(true);

    const interval = setInterval(() => {
      setTotalAmount(currentTotalAmount);
      setFees(currentFees);
      setDailyRepayments(currentDailyRepayments);
      setEstimatedTerm(currentEstimatedTerm);

      currentTotalAmount += Math.random() * 1000;
      currentFees += Math.random() * 100;
      currentDailyRepayments += Math.random() * 10;
      currentEstimatedTerm += 1;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      fetchTransactions().then(() => {
        setLoading(false);
      });
    }, 2000);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setAmountError(value < 2000 || value > 125000);
  };

  const handleRateChange = (e) => {
    const value = e.target.value;
    setRate(value);
    setRateError(value < 10 || value > 30);
  };

  const handleRecalculate = () => {
    setCount(count + 1);
    generateRandomNumbers();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Natwest Merchant lending facility details.</Typography>
      {apiError && (
        <Typography variant="body1" color="error" gutterBottom>
          {apiError}
        </Typography>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" margin="normal" error={amountError}>
            <TextField
              label="How much would you like?"
              value={amount}
              onChange={handleAmountChange}
              variant="outlined"
              type="number"
              helperText={amountError ? "The amount needs to be between £2000 to £125000" : "You can request between £2000 - £125000"}
              error={amountError}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" margin="normal" error={rateError}>
            <TextField
              label="Percentage of repayment rate from daily takings?"
              value={rate}
              onChange={handleRateChange}
              variant="outlined"
              type="number"
              helperText={rateError ? "The percentage needs to be between 10% to 30%" : "You can request between 10% - 30%"}
              error={rateError}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleRecalculate}
        disabled={amountError || rateError || !amount || !rate}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        {count === 1 ? 'Calculate' : 'Re-calculate'}
      </Button>
      <Typography variant="h6" gutterBottom>Your indicative repayments</Typography>
      <Box mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography>Estimated daily repayment</Typography>
            <Typography variant="h5">{dailyRepayments > 0 ? `£ ${dailyRepayments.toFixed(2)}` : "--"}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>Loan amount & fee</Typography>
            <Typography variant="h5">{loading ? `£ ${(Math.random() * 10000).toFixed(2)}` : (totalAmount > 0 ? `£ ${totalAmount.toFixed(2)}` : "--")}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>Total estimated term (months)</Typography>
            <Typography variant="h5">{loading ? Math.ceil(estimatedTerm) : (estimatedTerm > 0 ? Math.ceil(estimatedTerm) : "--")}</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>Fee</Typography>
            <Typography variant="h5">{loading ? `£ ${(Math.random() * 500).toFixed(2)}` : (fees > 0 ? `£ ${fees.toFixed(2)}` : "--")}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h6" gutterBottom>Natwest Merchant Lending fee structure</Typography>
      <Typography>Find out more about Natwest's simple fee structure for this loan <a href="https://link.to/fee-structure" target="_blank" rel="noopener noreferrer">here</a></Typography>
      <div style={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={prevStep} style={{ marginRight: '10px' }}>Back</Button>
        <Button variant="contained" color="primary" disabled={amountError || rateError || !amount || !rate}>Finish</Button>
      </div>
    </div>
  );
}

export default Setup;
