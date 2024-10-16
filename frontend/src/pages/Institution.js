import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Divider, Flex, Heading, View } from '@aws-amplify/ui-react';
import Accounts from '../components/Accounts';
import Transactions from '../components/Transactions';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';


export default function Institution() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [accountMap, setAccountMap] = useState({});

  const updateAccounts = (accounts) => {
    const accountMap = accounts.reduce((acc, cur, idx) => {
      acc[cur.account_id] = cur;
      return acc;
    }, {});
    setAccountMap(accountMap);
  }

  return (
    <Flex direction="column">
      <Divider/>
      <Flex direction="row">
        <Heading level={5}>Institution</Heading>
      </Flex>
      <Flex direction="row">
        <View flex="1">
          <Heading level={6}>Accounts</Heading>
          <Accounts id={id} updateAccounts={updateAccounts}/>
        </View>
        {/*
        <View>
          <Heading level={6}>Transactions</Heading>
          <Transactions id={id} accounts={accountMap}/>
        </View>
        */}

      </Flex>
      <Button onClick={() => navigate('/analyze')} 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '8px 17px',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
      }}>
        Next
       </Button>
    </Flex>
  );
}
