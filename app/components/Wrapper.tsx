import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  SchemaType,
} = require("@google/generative-ai");

const apiKey = "AIzaSyA2WhWi0ENAMjEGTAWtG3Bvso-1AyZA0K8";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite-preview-02-05",
  systemInstruction:
    "You are survivial expert, the user will provide his current situation and materials they have on hand, please fullfill their request and aid them in their surivial quick and concisely.",
});


export default function Wrapper() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  async function run(message: String) {
    try {
      const chatSession = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
        },
      });
      const response = chatSession.response.text();
      setResponse(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Gemini</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your prompt..."
        placeholderTextColor={"#ccc"}
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity onPress={() => run(input)} style={styles.button}>
        <Text style={styles.buttonText}>Send to Gemini</Text>
      </TouchableOpacity>
      {response ? (
        <ScrollView
          style={styles.responseBox}
          contentContainerStyle={styles.responseContent}
          showsVerticalScrollIndicator={false}
          overScrollMode="always"
        >
          <Text style={styles.responseText}>
            <Text style={{ fontWeight: "bold" }}>Response: </Text>
            {response}
          </Text>
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgb(22, 22, 22)",
    elevation: 3,
    marginTop: 20,
    maxHeight: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10,
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  responseBox: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    maxHeight: 600,
  },
  responseText: {
    fontSize: 16,
    color: "#f8f9fa",
  },
  responseContent: {
    padding: 10,
    paddingBottom: 20, // Add extra padding at the bottom for overscroll
  },
});
