import AsyncStorage from '@react-native-async-storage/async-storage';
import { Livro } from '../types';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? '';
const CHAVE_CACHE = 'cache_livros';

export async function buscarLivros(): Promise<Livro[]> {
  try {
    const resposta = await fetch(API_URL + '/livros.php', {
      headers: { 'X-API-KEY': API_KEY },
    });

    if (!resposta.ok) {
      throw new Error('Erro ' + resposta.status);
    }

    const dados = await resposta.json();
    const lista = Array.isArray(dados) ? dados : dados.livros ?? dados.dados ?? [];
    const livros: Livro[] = lista.map((livro: Livro) => ({ ...livro, id: Number(livro.id) }));

    await AsyncStorage.setItem(CHAVE_CACHE, JSON.stringify(livros));
    return livros;
  } catch (erro) {
    const cache = await AsyncStorage.getItem(CHAVE_CACHE);
    if (cache) {
      return JSON.parse(cache);
    }
    throw erro;
  }
}
