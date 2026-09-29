import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InicioStackParamList } from '../types';
import { adicionarFavorito } from '../services/favoritos';

type Props = NativeStackScreenProps<InicioStackParamList, 'Favoritar'>;

export default function FavoritarModal({ navigation, route }: Props) {
  const { id, titulo } = route.params;

  async function confirmar() {
    await adicionarFavorito(id);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.icone}>⭐</Text>
      <Text style={styles.texto}>Deseja adicionar "{titulo}" aos seus favoritos para ler depois?</Text>

      <Pressable style={[styles.botao, styles.botaoAmarelo]} onPress={confirmar}>
        <Text style={styles.botaoTexto}>Confirmar</Text>
      </Pressable>

      <Pressable style={[styles.botao, styles.botaoCinza]} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  icone: { fontSize: 48, textAlign: 'center' },
  texto: { fontSize: 18, textAlign: 'center', marginVertical: 20, color: '#1f2937' },
  botao: { padding: 14, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  botaoAmarelo: { backgroundColor: '#d97706' },
  botaoCinza: { backgroundColor: '#6b7280' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
