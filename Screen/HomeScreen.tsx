import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ color: "#fff" }}>Comming from home screen</Text>
        <Text style={{ color: "#fff" }}>Pull down to refresh content</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDECEF',
    alignItems: "center",
    justifyContent: "center",
    color: '#0F110C',
  },
});

export default HomeScreen;
