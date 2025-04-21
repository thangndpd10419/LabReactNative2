import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = useState(); // Biến lưu sound object
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc

  // Hàm phát nhạc
  async function playSound() {
    console.log(" Loading Sound");

    // Nếu chưa có sound, tạo mới
    // if (!sound) {
    const { sound, status } = await Audio.Sound.createAsync(
      require("../assets/kingdomcome.mp3") // Đường dẫn tới file nhạc
    );
    console.log(status);
    setSound(sound); // Lưu lại sound object
    await sound.playAsync(); // Bắt đầu phát
    setIsPlaying(true); // Cập nhật trạng thái

    // Theo dõi trạng thái phát
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false); // Tự động dừng khi nhạc kết thúc
      }
    });
    // } else {
    //   await sound.playAsync(); // Nếu đã load rồi, chỉ cần phát
    //   setIsPlaying(true);
    // }
  }

  // Hàm tạm dừng nhạc
  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  // Dọn dẹp sound khi component bị huỷ (tránh rò rỉ bộ nhớ)
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync(); // Giải phóng âm thanh
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Simple Music Player</Text>
      <Button
        title={isPlaying ? "Pause" : "Play"}
        onPress={isPlaying ? pauseSound : playSound}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
