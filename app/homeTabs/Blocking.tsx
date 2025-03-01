import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");
const ITEM_SIZE = (width / 2) - 25; // Adjusted for better spacing

const ModuleGrid = () => {
  const [modules, setModules] = useState([
    { id: 1, name: "Battery Module" },
    { id: 2, name: "AI Assist Module" },
    { id: 3, name: "Radio/Receiver" },
    { id: 4, name: "+" },
  ]);

  const addModule = () => {
    setModules([...modules.slice(0, -1), { id: modules.length, name: `Module ${modules.length}` }, { id: modules.length + 1, name: "+" }]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.moduleBox} 
            onPress={item.name === "+" ? addModule : undefined}
          >
            {item.name === "+" ? (
              <Icon name="add-circle" size={50} color="white" />
            ) : (
              <Text style={styles.moduleText}>{item.name}</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        horizontal={false} // Ensure only vertical scrolling
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#272727",
    padding: 10,
  },
  moduleBox: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: "#444",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  moduleText: {
    color: "white",
    fontSize: 18,
  },
});

export default ModuleGrid;
