import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_FAVORITOS = 'favoritos';

export async function carregarFavoritos(): Promise<number[]> {
  const texto = await AsyncStorage.getItem(CHAVE_FAVORITOS);
  if (texto) {
    return JSON.parse(texto);
  }
  return [];
}

export async function adicionarFavorito(id: number): Promise<void> {
  const favoritos = await carregarFavoritos();
  if (!favoritos.includes(id)) {
    favoritos.push(id);
  }
  await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
}

export async function removerFavorito(id: number): Promise<void> {
  const favoritos = await carregarFavoritos();
  const novaLista = favoritos.filter((item) => item !== id);
  await AsyncStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(novaLista));
}
