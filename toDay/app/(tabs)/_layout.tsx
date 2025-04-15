import { Stack, Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
	<GestureHandlerRootView>
		<Tabs>
			<Tabs.Screen name="calendar"/>
			<Tabs.Screen name="index" options={{ title: 'todos' }}/>
		</Tabs>
	</GestureHandlerRootView>
  )
}
