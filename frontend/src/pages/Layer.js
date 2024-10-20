// frontend/src/pages/Layer.js
import React, { useState } from 'react';
import { Button, Input, Flex, Heading } from '@aws-amplify/ui-react';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';

function Layer() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/tokens/layer', { phone_number: phoneNumber });
      setVerificationId(response.data.verification_id);
      setError('');
    } catch (err) {
      setError('Failed to initiate verification. Please try again.');
    }
  };

  const onSuccess = async (public_token, metadata) => {
    try {
      const response = await axios.post('/api/tokens/exchange', {
        public_token,
        metadata,
      });
      console.log('Token exchange successful:', response.data);
      // Handle success (e.g., store access token, navigate, etc.)
    } catch (err) {
      console.error('Token exchange failed:', err);
      setError('Failed to exchange public token. Please try again.');
    }
  };

  const { open, ready } = usePlaidLink({
    token: verificationId, // Use the verification ID from the previous step
    onSuccess,
    onExit: (err, metadata) => {
      // Handle exit
      if (err) {
        console.error('Error during Plaid Link exit:', err);
      }
    },
  });

  return (
    <Flex direction="column" alignItems="center" justifyContent="center" style={{ height: '60vh' }}>
      <Heading level={4}>Login with phone number</Heading>
      <Input
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <Button onClick={open} disabled={!verificationId}>Open Plaid Link</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {verificationId && <p>Verification initiated. ID: {verificationId}</p>}
    </Flex>
  );
}

export default Layer;