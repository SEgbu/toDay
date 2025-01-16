import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
	<Stack>
		<Stack.Screen name="calendar"/>
		<Stack.Screen name="index"/>
	</Stack>
  )
}
