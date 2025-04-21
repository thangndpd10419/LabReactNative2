import React from "react";
import { View } from "react-native";
import MusicPlayer from "./MusicPlayer"; // Component phát nhạc

export default function MusicPlayerScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MusicPlayer />
    </View>
  );
}
