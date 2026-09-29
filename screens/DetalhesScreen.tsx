import { useEffect, useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useIsFocused, useNavigationState } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { InicioStackParamList, Livro } from '../types';
import { buscarLivros } from '../services/api';
import { carregarFavoritos, removerFavorito } from '../services/favoritos';

type Props = NativeStackScreenProps<InicioStackParamList, 'Detalhes'>;

export default function DetalhesScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const [livro, setLivro] = useState<Livro | undefined>();
  const [proximo, setProximo] = useState<Livro | undefined>();
  const [favorito, setFavorito] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const telaFocada = useIsFocused();
  const telasNaPilha = useNavigationState((state) => state.routes.length);

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro('');
        const livros = await buscarLivros();
        const posicao = livros.findIndex((item) => item.id === id);
        setLivro(livros[posicao]);
        setProximo(livros[posicao + 1] ?? livros[0]);
      } catch {
        setErro('Não foi possível carregar os detalhes do livro.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  useEffect(() => {
    async function verificarFavorito() {
      const favoritos = await carregarFavoritos();
      setFavorito(favoritos.includes(id));
    }
    if (telaFocada) {
      verificarFavorito();
    }
  }, [telaFocada, id]);

  async function desfavoritar() {
    await removerFavorito(id);
    setFavorito(false);
  }

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1e3a8a" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (erro || !livro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro || 'Livro não encontrado.'}</Text>
        <Pressable style={styles.botao} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoTexto}>⬅ Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📖 {livro.titulo}</Text>

      <View style={styles.card}>
        {Object.entries(livro).map(([campo, valor]) => (
          <Text key={campo} style={styles.linha}>
            <Text style={styles.campo}>{campo}: </Text>
            {String(valor)}
          </Text>
        ))}
      </View>

      {favorito ? (
        <Pressable style={[styles.botao, styles.botaoCinza]} onPress={desfavoritar}>
          <Text style={styles.botaoTexto}>☆ Desfavoritar</Text>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.botao, styles.botaoAmarelo]}
          onPress={() => navigation.navigate('Favoritar', { id: livro.id, titulo: livro.titulo })}
        >
          <Text style={styles.botaoTexto}>⭐ Favoritar</Text>
        </Pressable>
      )}

      <Text style={styles.subtitulo}>navigate() x push()</Text>
      <Text style={styles.info}>Telas na pilha agora: {telasNaPilha}</Text>

      {proximo && (
        <View>
          <Pressable style={styles.botao} onPress={() => navigation.navigate('Detalhes', { id: proximo.id })}>
            <Text style={styles.botaoTexto}>Próximo livro com navigate()</Text>
          </Pressable>
          <Pressable style={styles.botao} onPress={() => navigation.push('Detalhes', { id: proximo.id })}>
            <Text style={styles.botaoTexto}>Próximo livro com push()</Text>
          </Pressable>
        </View>
      )}

      <Pressable style={[styles.botao, styles.botaoVerde]} onPress={() => navigation.getParent()?.navigate('Favoritos')}>
        <Text style={styles.botaoTexto}>Ver meus favoritos</Text>
      </Pressable>

      <Pressable style={[styles.botao, styles.botaoCinza]} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>⬅ Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  container: { padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  subtitulo: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  info: { color: '#6b7280', marginBottom: 4 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 8 },
  linha: { fontSize: 15, marginBottom: 6, color: '#1f2937' },
  campo: { fontWeight: 'bold' },
  erro: { color: '#b91c1c', fontSize: 16, textAlign: 'center', marginBottom: 12 },
  botao: { backgroundColor: '#1e3a8a', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  botaoAmarelo: { backgroundColor: '#d97706' },
  botaoVerde: { backgroundColor: '#059669' },
  botaoCinza: { backgroundColor: '#6b7280' },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
