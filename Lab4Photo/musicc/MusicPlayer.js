import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

// Danh sách phát nhạc
const playlist = [
  {
    id: "1",
    url: require("../assets/waitingforlove.mp3"),
    title: "Waiting for love",
    artist: "AVICI",
    artwork: require("../assets/favicon.png"),
  },
  {
    id: "2",
    url: require("../assets/kingdomcome.mp3"),
    title: "This is my kingdom come",
    artist: "Demons",
    artwork: require("../assets/favicon.png"),
  },
  {
    id: "3",
    url: require("../assets/something.mp3"),
    title: "Something just like this",
    artist: "KOT",
    artwork: require("../assets/favicon.png"),
  },
];

const MusicPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    loadTrack(trackIndex);

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [trackIndex]);

  const loadTrack = async (index) => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      playlist[index].url,
      { shouldPlay: false },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 1);
      setIsPlaying(status.isPlaying);
    }
  };

  const playPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  };

  const skipToNext = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const skipToPrevious = () => {
    setTrackIndex(
      (prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length
    );
  };

  const seekTo = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      {/* Ảnh Album */}
      <Image source={playlist[trackIndex].artwork} style={styles.albumArt} />

      {/* Thông tin bài hát */}
      <Text style={styles.songTitle}>{playlist[trackIndex].title}</Text>
      <Text style={styles.artist}>{playlist[trackIndex].artist}</Text>

      {/* Thanh Tua Nhạc */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seekTo}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="black"
        thumbTintColor="#FFFFFF"
      />

      {/* Nút Điều Khiển */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={skipToPrevious}>
          <Ionicons name="play-skip-back" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={playPause}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={40}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext}>
          <Ionicons name="play-skip-forward" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7d9d9",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  artist: {
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  slider: {
    width: "90%",
    height: 40,
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
  },
  playButton: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
  },
});

export default MusicPlayer;
