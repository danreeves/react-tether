import { ThemeProvider, DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: ["#BDA1E8", "#77FFEC", "#E8E19A", "#B1FFDD", "#FFCDBE"],
  font: '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif',
  lightText: "#fff",
  darkText: "#000",
};

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactElement;
}) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
