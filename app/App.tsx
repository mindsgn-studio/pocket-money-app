import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import WalletCore from './WalletCore';

export default function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    async function fetchFromGo() {
      try {
        const msg = await WalletCore.helloWorld();
        setMessage(msg);
      } catch (e) {
        setMessage('Error calling Go: ' + e);
      }
    }
    fetchFromGo();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}