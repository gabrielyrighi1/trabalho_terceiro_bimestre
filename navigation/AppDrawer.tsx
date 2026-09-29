import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerParamList } from '../types';
import AppTabs from './AppTabs';
import SobreScreen from '../screens/SobreScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function AppDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ drawerActiveTintColor: '#1e3a8a' }}>
      <Drawer.Screen name="Principal" component={AppTabs} options={{ title: 'Catálogo de Livros' }} />
      <Drawer.Screen name="Sobre" component={SobreScreen} options={{ title: 'Sobre o app' }} />
    </Drawer.Navigator>
  );
}
