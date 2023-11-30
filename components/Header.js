import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

const Container = styled.View`
  width: 100%;
  height: 17%
  margin-bottom: -10%;
  padding: 0 11px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background: #000000;
`;

const Text = styled.Text`

  color: #9203F0; 
  font-size: 24px;
  font-weight: bold;
  font-family: 'Groovy';
`;

const Row = styled.View`
  flex-direction: row;
`;



const Header = () => {
  return (
    <Container>
      <Row>
          <Image source={require('../assets/La_Hermandad_Icon.png')} style={{ width: 60, height: 60, borderRadius:40 }} />
      </Row>
      <Text>LA HERMANDAD</Text>
      <Row>
          <Image source={require('../assets/La_Hermandad_Icon.png')} style={{ width: 60, height: 60, borderRadius:40 }} />
      </Row>
    </Container>
  );
};

export default Header;
