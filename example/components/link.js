import styled from 'styled-components';
import chroma from 'chroma-js';

export default styled.a`
  color: ${({ theme }) =>
    chroma(theme.colors[1])
      .darken()
      .hex()};
`;
