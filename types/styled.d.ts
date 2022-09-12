// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: ["#BDA1E8", "#77FFEC", "#E8E19A", "#B1FFDD", "#FFCDBE"];
    font: '"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif';
    lightText: "#fff";
    darkText: "#000";
  }
}
