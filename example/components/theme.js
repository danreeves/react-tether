import React from 'react';
import { ThemeProvider } from 'styled-components';

export type Theme = {
  colors: Array<string>,
  font: string,
  lightText: string,
  darkText: string,
};
const theme: Theme = {
  colors: ['#BDA1E8', '#77FFEC', '#E8E19A', '#B1FFDD', '#FFCDBE'],
  font: '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif',
  lightText: '#fff',
  darkText: '#000',
};

export default function ThemeWrapper(props) {
  return <ThemeProvider theme={theme} {...props} />;
}
