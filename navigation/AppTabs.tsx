import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types';
import InicioStack from './InicioStack';
import FavoritosScreen from '../screens/FavoritosScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1e3a8a' }}>
      <Tab.Screen
        name="InicioStack"
        component={InicioStack}
        options={{
          title: 'Catálogo',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>📚</Text>,
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>⭐</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
