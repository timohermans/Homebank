export const size = {
  mobile: "768px"
};

export const device = {
  mobile: `(max-width: ${size.mobile})`,
  desktop: `(min-width: ${size.mobile})`
};

export const theme = {
  colors: {
    border: "#e3e3e3",
    dark: "#141240",
    secondary2: "#000099",
    section: "#fff",
    shadow: "rgba(0, 0, 0, 0.3)",
    primary: "#fd6400",
    primary2: "#fe8000",
  },
  background: "#f6f6f6",
  secondary: "#19197c",
  link: "#19197c",
  heading5: "#666666",
  rounded: "5px",
  activeFontWeight: "700",
  roundedSm: "0.25rem",
  roundedM: "0.5rem",
  shadow: `rgba(0, 0, 0, 0.3) 0px 1px 2px 0px`,
  size: size,
  device: device,
  spacing: {
    s: "1rem",
    m: "2rem",
    l: "4rem"
  },
  zIndex: {
    modal: "9000",
    overlay: "8000"    
  }
};
