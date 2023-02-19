import { styled } from "@stitches/react";

export const HeaderContainer = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",

  display: "flex",
  justifyContent: "space-between",
});

export const ItemsCount = styled("span", {
  position: "absolute",
  right: -7,
  top: -7,

  width: "calc(1.5rem + 3px)",
  height: "calc(1.5rem + 3px)",
  border: "3px solid $gray900",
  borderRadius: 1000,
  background: "$green300",

  fontWeight: 700,
  fontSize: "0.875rem",
  lineHeight: 1.6,
  color: "$white",
});
export const CartButton = styled("button", {
  position: "relative",
  background: "$gray800",
  border: "none",
  cursor: "pointer",
  width: "3rem",
  height: "3rem",
  borderRadius: 6,

  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.6,
  },
});
