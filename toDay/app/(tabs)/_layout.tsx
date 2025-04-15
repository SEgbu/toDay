import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
	<Tabs>
		<Tabs.Screen name="calendar"/>
		<Tabs.Screen name="index"/>
		<Tabs.Screen name="statistics"/>
	</Tabs>
  )
}
