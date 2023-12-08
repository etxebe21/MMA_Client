import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components/native";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { StyledProgressBar } from '../components/ProgressBar';
import { Context } from "../context/Context";
import { socket } from '../socket/socketConnect';
import TiredModal from "../components/TiredModal";
import { Modal } from "react-native";

const Profile = () => {

  const { userGlobalState, handleUserGlobalState } = useContext(Context);
  const [modal, setModal] = useState(false);

  const restartAtributes = userGlobalState;
  if (userGlobalState._id !== undefined) {
    const userId = userGlobalState._id;

  }

  const initialAtributes = {
    resistencia: restartAtributes.resistencia,
    agilidad: restartAtributes.agilidad,
    cansancio: restartAtributes.cansancio,
    fuerza: restartAtributes.fuerza
  }

  useEffect(() => {
    console.log("RESISTENCIA", userGlobalState.resistencia)
    if (userGlobalState.resistencia <= 20) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, []);

  const restStats = () => {
    console.log("Pulsado boton descansar");
    socket.emit('resetUserAtributes', { userId, initialAtributes });
    console.log("Atributos enviados");

    socket.on('receiveUserAtributes', (responseData) => {
      console.log('usuario actual recibido desde el servidor:', responseData);
      handleUserGlobalState(responseData);
    });
  }

  return (

    <View >
      <ImageBackground source={require("../assets/wallpaper_profile.png")} style={styles.imageBackground}>
        {userGlobalState && (
          <Content>
            <AvatarBox>
            <RestButton onPress={() => {}}>
            <ImageTired source={require('../assets/TiredBed.png')} />
            </RestButton>
              <DetailAvatar source={{ uri: userGlobalState.picture }} style={{ width: 90, height: 90, borderRadius: 45 }} />
              <MarcoFoto source={require("../assets/marcoEpico.png")} />
              <UserLevelMarco>
                <UserTextLevel> {userGlobalState.level}</UserTextLevel>
              </UserLevelMarco>

              <UserText>{userGlobalState.username}</UserText>
            </AvatarBox>

            <Statsbackground>
              <ProgressBarRow>
                <ProgressBarColumn>
                  <ProgressBarTitle>LEVEL:   {userGlobalState.level}</ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.level / 20} />
                  <ProgressBarTitle>HITPOINTS:   {userGlobalState.hitPoints}</ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.hitPoints / 100} />
                  <ProgressBarTitle>STRENGTH: {userGlobalState.fuerza}  </ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.fuerza / 100} />
                  <ProgressBarTitle>GOLD:  {userGlobalState.dinero}</ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.dinero / 100} />
                </ProgressBarColumn>

                <ProgressBarColumn>
                  <ProgressBarTitle>TIRED: {userGlobalState.cansancio} </ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.cansancio / 100} />
                  <ProgressBarTitle>RESISTENCE: {userGlobalState.resistencia} </ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.resistencia / 100} />
                  <ProgressBarTitle>AGILITY:  {userGlobalState.agilidad}</ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.agilidad / 100} />
                  <ProgressBarTitle>INTELLIGENCE: {userGlobalState.inteligencia}</ProgressBarTitle>
                  <StyledProgressBar progress={userGlobalState.inteligencia / 100} />
                </ProgressBarColumn>
              </ProgressBarRow>


            </Statsbackground>
          </Content>

        )}

        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <ImageBackground source={require("../assets/tiredAcolite.png")} style={styles.imageBackground}>
            <View>
              <Text>¡TU RESISTENCIA ES MUY BAJA!</Text>
            </View>
          </ImageBackground>
        </Modal>

      </ImageBackground>
    </View>

  )
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Content = styled.View`
  heigth: 100%;
  width: 100%;
`
const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%;
`
const ImageTired = styled.Image`
border-radius:40px;
height:40px;
width: 55px;
left:5px;
`
const Statsbackground = styled.ImageBackground`
  height: 64%;
  overflow: hidden;
  justify-content: flex-start;
  border:3px; 
  border-color: pink;
`
const UserText = styled.Text`
  color: white;
  font-family: Tealand;
  text-shadow: 3px 3px 4px black;
  font-size: 20px;
  margin-top: 1%;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`
const UserLevelMarco = styled.View`
  align-self: center;
  border:3px;
  border-radius:50px;
  border-color: rgb(124, 44, 245 );
  height: 22%;
  width:  13%;
  left:   10%;
  margin-top: -13%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`
const UserTextLevel = styled.Text`
  color: black;
  font-size: 20px;
  font-weight: bold;
  margin-left: -10%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DetailAvatar = styled.Image`
  align-self: center;
`
const AvatarBox = styled.View`
  border: 3px;
  border-color: white;
  height: 36%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const MarcoFoto = styled.Image`
  width:  150px;
  height: 150px;
  border-radius: 100px;
  margin-top: -32%;
`
export const Switch = styled.Switch.attrs(({ value }) => ({
  trackColor: { false: '#767577', true: '#4c2882' },
  thumbColor: value ? '#913595' : '#f4f3f4',
  marginRight: 125,
  top: 10
}))``;

const ProgressBarRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const ProgressBarColumn = styled.View`
  align-items: center;
  top:25px;
`;

const ProgressBarTitle = styled.Text`
  color: red;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  right:15px;
`;

const RestButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px; 
  left: 20px; 
  background: #A3A2A2;
  opacity: 0.65;
  width: 63px;
  height: 50px;
  border-radius: 30px;
  border: #0B0B0B;
  background-color: rgba(255, 255, 255, 0.2);
`;



export default Profile;