import React, { useLayoutEffect } from 'react';
import { Stack } from 'expo-router';

const AccountLayout: React.FC = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <Stack>
      <Stack.Screen name="Login" component={Login} />
    </Stack>
  );
};

export default AccountLayout;