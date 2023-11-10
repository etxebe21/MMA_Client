import styled from 'styled-components/native';
import Slider from '@react-native-community/slider';

export const StyledSlider = styled(Slider).attrs({
  minimumValue: 0,
  maximumValue: 100,
  minimumTrackTintColor: '#4c2882',
  maximumTrackTintColor: '#0087FF',
  thumbTintColor: '#913595',
})`
  width: 285px;
  height: 40px;
`;
