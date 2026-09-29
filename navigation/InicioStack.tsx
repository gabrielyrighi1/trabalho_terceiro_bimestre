import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InicioStackParamList } from '../types';
import ListaScreen from '../screens/ListaScreen';
import DetalhesScreen from '../screens/DetalhesScreen';
import FavoritarModal from '../screens/FavoritarModal';

const Stack = createNativeStackNavigator<InicioStackParamList>();

export default function InicioStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lista" component={ListaScreen} options={{ title: 'Livros' }} />
      <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Detalhes do livro' }} />
      <Stack.Screen
        name="Favoritar"
        component={FavoritarModal}
        options={{ presentation: 'modal', title: 'Adicionar aos favoritos' }}
      />
    </Stack.Navigator>
  );
}
