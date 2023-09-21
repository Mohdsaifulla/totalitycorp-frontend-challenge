import React from "react";

interface Props {
  amount: number;
}
const FormattedPrice = ({ amount }: Props) => {
  const formattedAmmount = new Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  return <span>{formattedAmmount}</span>
};

export default FormattedPrice;
