import { colors } from "../styles/CompStyle";

export const getRandomColor = () => {
  let ColArray = [colors.A, colors.B, colors.C, colors.D, colors.F];
  const randomIndex = Math.floor(Math.random() * ColArray.length);
  const color = ColArray[randomIndex];
  ColArray = ColArray.filter((_, index) => index !== randomIndex);
  if (ColArray.length == 0) {
    ColArray = [colors.A, colors.B, colors.C, colors.D, colors.F];
  }
  return color;
};
