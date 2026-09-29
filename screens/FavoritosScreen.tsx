import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList, Livro } from '../types';
import { buscarLivros } from '../services/api';
import { carregarFavoritos } from '../services/favoritos';

type Props = BottomTabScreenProps<TabParamList, 'Favoritos'>;

export default function FavoritosScreen({ navigation }: Props) {
  const [favoritos, setFavoritos] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const telaFocada = useIsFocused();

  useEffect(() => {
    async function carregar() {
      try {
        setErro('');
        const ids = await carregarFavoritos();
        const livros = await buscarLivros();
        setFavoritos(livros.filter((livro) => ids.includes(livro.id)));
      } catch {
        setErro('Não foi possível carregar os favoritos.');
      } finally {
        setCarregando(false);
      }
    }
    if (telaFocada) {
      carregar();
    }
  }, [telaFocada]);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1e3a8a" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoritos}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={<Text style={styles.vazio}>Você ainda não favoritou nenhum livro ⭐</Text>}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('InicioStack', { screen: 'Detalhes', params: { id: item.id } })}
        >
          <Text style={styles.titulo}>⭐ {item.titulo}</Text>
          <Text style={styles.autor}>{item.autor}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  erro: { color: '#b91c1c', fontSize: 16, textAlign: 'center' },
  vazio: { textAlign: 'center', marginTop: 40, color: '#6b7280' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 12, marginTop: 10, borderRadius: 10 },
  titulo: { fontSize: 17, fontWeight: 'bold', color: '#1f2937' },
  autor: { fontSize: 14, color: '#6b7280', marginTop: 4 },
});
