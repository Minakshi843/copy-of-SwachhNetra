// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // hide header globally
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}
