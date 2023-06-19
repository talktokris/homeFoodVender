import { ScrollView, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import ImageInput from "./ImageInput";
import settings from "../config/setting";

export default function ImageInputList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}) {
  const scrollView = useRef();

  function makeUri(uri) {
    return (
      settings.imageUrl + "/menu/" + uri.food_menu_id + "/" + uri.image_name
    );
  }

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <ImageInput
              imageUri={makeUri(uri)}
              key={uri.id}
              onRemoveImage={() => onRemoveImage(uri)}
            />
          ))}
          <ImageInput onAddImage={onAddImage} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});
