import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

const Container = styled.View`
  width: 100%;
  height: 85px;
  padding: 0 11px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background: #2e1b3c;
  elevation: 5;
  opacity:1;
`;

const Text = styled.Text`
  margin-top: 5px;
  color: #bf55ec; 
  font-size: 24px;
  font-weight: bold;
  letter-spacing: -0.3px;
  font-family: 'Tealand';
`;

const Row = styled.View`
  flex-direction: row;
`;



const Header = () => {
  return (
    <Container>
      <Row>
          <Image source={require('../assets/chaos2.png')} style={{ width: 60, height: 60, borderRadius:40 }} />
      </Row>
      <Text>LA HERMANDAD</Text>
      <Row>
          <Image source={require('../assets/chaos1.png')} style={{ width: 60, height: 60, borderRadius:40 }} />
      </Row>
    </Container>
  );
};

export default Header;
