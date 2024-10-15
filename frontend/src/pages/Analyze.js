import React, { useState, useEffect } from 'react';
import { generateClient } from '@aws-amplify/api';
import { getAnalyzeResult as GetAnalyzeResult } from '../graphql/queries';

function Analyze() {
  const [analyzeResult, setAnalyzeResult] = useState('');
  const [error, setError] = useState('');
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
    <div>
      <h1>Start analyzing...</h1>
      {error ? (
        <p style={{color: 'red'}}>{error}</p>
      ) : (
        <p>{analyzeResult}</p>
      )}
    </div>
  );
}

export default Analyze;