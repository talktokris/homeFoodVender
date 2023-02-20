import React from "react";
import AppButton from "../AppButton";

function LinkButton({ title, color, icon, onPress }) {
  return (
    <AppButton title={title} color={color} icon={icon} onPress={onPress} />
  );
}

export default LinkButton;
