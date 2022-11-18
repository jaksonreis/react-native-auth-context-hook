import React from 'react';
import { useAuth } from '../../contexts/auth';

import {
  Container,
  Button,
  Title
} from './styles';

export function SignIn() {
  const { signed, signIn } = useAuth();

  console.log(signed)

  function handleSignIn() {
    signIn();
  }
  return (
    <Container>
      <Button onPress={handleSignIn}>
        <Title>Sign In</Title>
      </Button>
    </Container>)
}