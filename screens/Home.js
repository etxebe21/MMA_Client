import React from "react";
import styled from "styled-components/native";


const View = styled.View`
    flex: 1;
    background: #913595;
`

const Text = styled.Text `
    bottom: -100px;
    color: #4c2882;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: -0.3px;
    align-self: center; 
    
`

const Home = () => {

    return(
        <View>
            <Text>HOME</Text>
        </View>
        
    )
}

export default Home