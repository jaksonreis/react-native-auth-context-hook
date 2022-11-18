import React from 'react';
import { useAuth } from '../../contexts/auth';

import {
  Container,
  Button,
  Title
} from './styles';

export function Dashboard(){
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }
  return (
    <Container>
      <Button onPress={handleSignOut}>
        <Title>Sign Out</Title>
      </Button>
    </Container>)
}