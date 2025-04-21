import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // Danh sách bài hát (bạn có thể thay bằng file nhạc của bạn)
  const songs = [
    { title: "Bài hát 1", uri: require("../assets/kingdomcome.mp3") },
    { title: "Bài hát 2", uri: require("../assets/something.mp3") },
  ];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  // Load bài hát khi component mount hoặc khi currentSongIndex thay đổi
  useEffect(() => {
    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSongIndex]);

  const loadAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      songs[currentSongIndex].uri,
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );

    setSound(newSound);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const playPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Music Player</Text>
      <Text style={styles.songTitle}>{songs[currentSongIndex].title}</Text>

      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={async (value) => {
            if (sound) {
              await sound.setPositionAsync(value);
            }
          }}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1DB954"
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={prevSong} style={styles.controlButton}>
          <Text style={styles.controlText}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={playPause} style={styles.playButton}>
          <Text style={styles.playButtonText}>{isPlaying ? "⏸" : "⏵"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextSong} style={styles.controlButton}>
          <Text style={styles.controlText}>⏭</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  songTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  progressContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    width: 50,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  controlButton: {
    marginHorizontal: 20,
  },
  controlText: {
    fontSize: 24,
  },
  playButton: {
    backgroundColor: "#1DB954",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: {
    fontSize: 30,
    color: "white",
  },
});
