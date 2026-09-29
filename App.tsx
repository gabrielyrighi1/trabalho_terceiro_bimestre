import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppDrawer from './navigation/AppDrawer';

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
