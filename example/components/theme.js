import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: ['#BDA1E8', '#77FFEC', '#E8E19A', '#B1FFDD', '#FFCDBE'],
  font: '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif',
  lightText: '#fff',
  darkText: '#000',
};

export default props => <ThemeProvider theme={theme} {...props} />;
