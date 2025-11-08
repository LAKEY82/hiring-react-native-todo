import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  

  useEffect(() => {
    // Pulsing / enlarging wave animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,       // enlarge
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,         // shrink back
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to Dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace("Dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        tasked
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#51ACB4",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "lowercase",
    letterSpacing: 1.5,
  },
});
