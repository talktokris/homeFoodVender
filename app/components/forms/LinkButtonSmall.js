import React from "react";
import AppButtonSmall from "../AppButtonSmall";

function LinkButtonSmall({ title, color, icon, onPress }) {
  return (
    <AppButtonSmall title={title} color={color} icon={icon} onPress={onPress} />
  );
}

export default LinkButtonSmall;
