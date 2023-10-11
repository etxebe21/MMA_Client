import React from 'react';
import styled from 'styled-components/native';


const Container = styled.View`
    width: 100%;
    height: 58px;
    padding: 0 11px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between; 
    background: #913595;
    `


const Text = styled.Text `
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
`
const Row = styled.View`
    flex-direction: row;
`

const Button = styled.TouchableOpacity`
    width: 42px;
    height: 42px;
    border-radius: 21px;
    margin-left: 16px;
    background: #913595;
    align-items: center;
    justify-content: center;
`

const Header = () => {
    return(
        <Container>
            <Text> LA HERMANDAD </Text> 
        </Container>
    )
}
export default Header;

