const colors = {

  /**
   * Text related colors
   */
  blackText: "#000000",
  lightGrayText: "#C8C8C8",

  /**
   * General colors
   */
  black: "#000000",
  white: "#ffffff",
  greenUnderline: "#7BB9C0",
  lightGrayUnderline: "#E8E8E8",
};

const defaultTheme = {
  colors
};

export type ThemeType = typeof defaultTheme;
export type StyledThemePropsType = { theme: ThemeType };

export default defaultTheme;
