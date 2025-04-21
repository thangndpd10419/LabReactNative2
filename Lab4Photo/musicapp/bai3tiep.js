import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Vị trí hiện tại trong playlist
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc (play/pause)
  const [position, setPosition] = useState(0); // Vị trí hiện tại của bài hát
  const playlist = [
    require("../assets/something.mp3"),
    require("../assets/waitingforlove.mp3"),
    require("../assets/kingdomcome.mp3"),
  ];
  // Hàm load và phát bài hát
  const loadAndPlaySong = async (index) => {
    if (sound) {
      await sound.unloadAsync(); // Giải phóng tài nguyên của bài hát cũ nếu có
    }
    // Tải bài hát mới
    const { sound, status } = await Audio.Sound.createAsync(playlist[index]);
    setSound(sound);
    await sound.playAsync(); // Phát bài hát
    setCurrentIndex(index); // Cập nhật vị trí trong playlist
    setIsPlaying(true); // Đánh dấu trạng thái là đang phát

    console.log(status.durationMillis);
    // Thiết lập callback để cập nhật vị trí khi bài hát phát
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isPlaying) {
        setPosition(status.positionMillis); // Cập nhật vị trí của bài hát khi đang phát
      }
    });
  };

  // Hàm tạm dừng bài hát
  const pauseSong = async () => {
    if (sound) {
      await sound.pauseAsync(); // Tạm dừng bài hát
      setIsPlaying(false); // Đánh dấu trạng thái là dừng
    }
  };
  // Hàm tiếp tục bài hát
  const playSong = async () => {
    if (sound) {
      await sound.playFromPositionAsync(position); // Tiếp tục phát từ vị trí dừng
      setIsPlaying(true); // Đánh dấu trạng thái là đang phát
    }
  };
  // Hàm chuyển bài tiếp theo
  const playNext = () => {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= playlist.length) {
      nextIndex = 0; // Quay lại bài đầu tiên nếu đến cuối danh sách
    }
    loadAndPlaySong(nextIndex);
  };

  // Hàm chuyển bài trước đó
  const playPrevious = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = playlist.length - 1; // Quay lại bài cuối nếu đến đầu danh sách
    }
    loadAndPlaySong(prevIndex);
  };

  // Hàm dọn dẹp khi component unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Tải bài hát đầu tiên khi component mount
  useEffect(() => {
    loadAndPlaySong(0);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎶 Simple Music Player</Text>
      <Button title="Play Previous" onPress={playPrevious} />
      <Button title="Play Next" onPress={playNext} />
      <Button
        title={isPlaying ? "Pause" : "Play"}
        onPress={isPlaying ? pauseSong : playSong} // Đổi giữa Play và Pause
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
