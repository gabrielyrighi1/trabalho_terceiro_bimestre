import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InicioStackParamList, Livro } from '../types';
import { buscarLivros } from '../services/api';

type Props = NativeStackScreenProps<InicioStackParamList, 'Lista'>;

export default function ListaScreen({ navigation }: Props) {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      setErro('');
      const dados = await buscarLivros();
      setLivros(dados);
    } catch {
      setErro('Não foi possível carregar os livros. Verifique sua internet.');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function atualizar() {
    setAtualizando(true);
    carregar();
  }

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
        <Pressable style={styles.botao} onPress={atualizar}>
          <Text style={styles.botaoTexto}>Tentar de novo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={livros}
      keyExtractor={(item) => String(item.id)}
      refreshControl={<RefreshControl refreshing={atualizando} onRefresh={atualizar} />}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhum livro encontrado.</Text>}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => navigation.navigate('Detalhes', { id: item.id })}>
          <Text style={styles.titulo}>📖 {item.titulo}</Text>
          <Text style={styles.autor}>{item.autor}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  erro: { color: '#b91c1c', fontSize: 16, textAlign: 'center', marginBottom: 12 },
  vazio: { textAlign: 'center', marginTop: 40, color: '#6b7280' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 12, marginTop: 10, borderRadius: 10 },
  titulo: { fontSize: 17, fontWeight: 'bold', color: '#1f2937' },
  autor: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  botao: { backgroundColor: '#1e3a8a', padding: 12, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
