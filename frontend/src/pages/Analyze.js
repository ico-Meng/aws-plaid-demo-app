import React, { useState, useEffect } from 'react';
import { generateClient } from '@aws-amplify/api';

function Analyze() {
  const [analyzeResult, setAnalyzeResult] = useState('');
  const client = generateClient();
  
  useEffect(() => {
    fetchAnalyzeResult();
  }, []);
  
  async function fetchAnalyzeResult() {
    try {
      const response = await client.get({
        apiName: 'MyApiName',
        path: '/v1/analyze'
      });
      setAnalyzeResult(response.result);
    } catch (error) {
      console.error('Error fetching analyze result:', error);
      console.error('Error details:', error.response);
      setAnalyzeResult('Error fetching result');
    }
  }


  return (
    <div>
      <h1>Start analyzing...</h1>
      <p>{analyzeResult}</p>
    </div>
  );
}

export default Analyze;