import { styled } from "@/styles";

export const ProductContainer = styled("main", {
  display: "flex",
  gap: "1.25rem",
});
export const ImageContainer = styled("div", {
  width: "6rem",
  height: "6rem",

  background: "linear-gradient(180deg, #1ea4b3 0%, #7465d4 100%)",

  borderRadius: 8,
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  p: {
    lineHeight: 1.6,
    fontSize: "$md",
    color: "$gray300",
  },

  span: {
    lineHeight: 1.6,
    marginBottom: "0.5rem",
    fontWeight: 700,
    fontSize: "$md",
  },

  button: {
    maxWidth: "4rem",
    background: "transparent",
    border: "none",
    color: "$green500",
    fontSize: "1rem",
    fontWeight: 700,
    justifySelf: "right",
    textAlign: "left",
    cursor: "pointer",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const PurchaseContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "3.5rem",

  button: {
    height: "4.3125rem",
    background: "$green500",
    borderRadius: 8,
    padding: "1.25rem 2rem",
    border: "none",

    fontWeight: 700,
    fontSize: "$md",
    color: "$white",

    cursor: "pointer",

    "&:hover": {
      background: "$green300",
    },
  },
});

export const PurchaseDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});
export const QuantityOfProducts = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  span: {
    lineHeight: 1.6,
  },
});

export const TotalPurchaseAmount = styled("div", {
  display: "flex",
  justifyContent: "space-between",

  b: {
    fontWeight: 700,
    fontSize: "$md",
    lineHeight: 1.6,
  },
});
