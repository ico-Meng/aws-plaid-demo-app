import React, { useState, useEffect } from 'react';
import { generateClient } from '@aws-amplify/api';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Heading, View } from '@aws-amplify/ui-react';
import { getAnalyzeResult as GetAnalyzeResult } from '../graphql/queries';

function Analyze() {
  const [analyzeResult, setAnalyzeResult] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const client = generateClient();
  
  useEffect(() => {
    fetchAnalyzeResult();
  }, []);
  
  async function fetchAnalyzeResult() {
    try {
      const response = await client.graphql({
        query: `
          query GetAnalyzeResult {
            getAnalyzeResult {
              result
            }
          }
        `
      });
      setAnalyzeResult(response.data.getAnalyzeResult.result);
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching analyze result:', error);
      setAnalyzeResult('');
      if (error.errors && error.errors.length > 0) {
        setError(`Error: ${error.errors[0].message}`);
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  return (
    /*
    <div>
      <h1>Start analyzing...</h1>
      {error ? (
        <p style={{color: 'red'}}>{error}</p>
      ) : (
        <p>{analyzeResult}</p>
      )}
      <Button onClick={() => navigate(-1)} className="fixed-button">
        Back
      </Button>
    </div>
    */
    <Flex direction="column" className="content-wrapper">
    <Heading level={1}>Start analyzing...</Heading>
    <View>
      {error ? (
        <p style={{color: 'red'}}>{error}</p>
      ) : (
        <p>{analyzeResult}</p>
      )}
    </View>
      <Button onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          bottom: '20px',
          zIndex: 1000,
          padding: '8px 17px',
          cursor: 'pointer',
          right: '20px',
          textAlign: 'center',
        }}>
        Back
      </Button>
  </Flex>
  );
}

export default Analyze;