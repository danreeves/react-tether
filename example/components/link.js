import styled from 'styled-components';
import chroma from 'chroma-js';
import { colors } from '../constants';
import shuffle from '../shuffle';

function randomColor() {
  const color = shuffle(colors)[0];
  return chroma(color)
    .darken()
    .hex();
}

export default styled.a`
  color: ${chroma('#3acbba')
    .darken()
    .hex()};
`;
