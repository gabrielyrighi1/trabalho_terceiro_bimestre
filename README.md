# 📚 Catálogo de Livros

Trabalho prático de ARQAPMO (IFSP): app Expo/React Native que consome uma API, usa navegação Drawer, Tabs, Stack e Modal, e salva os favoritos no celular com AsyncStorage.

## Contexto escolhido

**Catálogo de livros**: lista de livros → detalhes do livro. O usuário pode favoritar livros para ler depois.

## API usada

API do curso (`api/livros.php`), protegida pelo header `X-API-KEY`.
- Endereço: `https://jrbeluzo.com.br/aulas/arqapmo/api/api/livros.php`

### Por que a chave fica no `.env`?

A chave da API é secreta e não pode ficar exposta num repositório público. Por isso ela não está no código:

- `services/api.ts` lê a URL e a chave com `process.env.EXPO_PUBLIC_API_URL` e `process.env.EXPO_PUBLIC_API_KEY`.
- Os valores de verdade ficam no arquivo `.env.local`, que está no `.gitignore` e **não** sobe para o GitHub.
- O arquivo `.env.example` sobe para o GitHub só como modelo, sem a chave.

O Expo lê automaticamente as variáveis que começam com `EXPO_PUBLIC_` quando o projeto é iniciado.

## Como rodar

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo chamado `.env.local` na raiz do projeto (pode copiar o `.env.example`) e coloque a chave que o professor passou:

   ```
   EXPO_PUBLIC_API_URL=https://jrbeluzo.com.br/aulas/arqapmo/api/api
   EXPO_PUBLIC_API_KEY=chave-passada-pelo-professor
   ```

3. Inicie o projeto:

   ```bash
   npx expo start -c
   ```

   O `-c` limpa o cache. Use sempre que mudar o `.env.local`.

4. Leia o QR Code com o app **Expo Go** no celular.

## Estrutura

```
navigation/   Drawer, Tabs e Stack
screens/      Lista, Detalhes, Modal de favoritar, Favoritos e Sobre
services/     Chamada da API (fetch) e funções do AsyncStorage
types/        Tipos do TypeScript
```

## O que o app faz

- **API:** a lista busca os livros com `fetch()` dentro de um `useEffect`, mostra "Carregando..." e mostra uma mensagem de erro se a API falhar.
- **Stack:** Lista → Detalhes passando o `id` por `route.params`, botão de voltar com `goBack()` e dois botões que mostram a diferença entre `navigate()` e `push()`.
- **Tabs:** aba "Catálogo" (Stack) e aba "Favoritos". Tocar num favorito abre os detalhes dele com `navigation.navigate('InicioStack', { screen: 'Detalhes', params: { id } })`.
- **Modal:** o botão "⭐ Favoritar" abre uma tela com `presentation: 'modal'` que salva o favorito no AsyncStorage antes de fechar.
- **AsyncStorage:** a lista de ids favoritos fica salva no celular, mesmo depois de fechar o app.

### Bônus

- Cache dos últimos livros baixados, que aparecem mesmo sem internet.
- `navigation.getParent()` na tela de detalhes para ir até a aba Favoritos.
- Puxar a lista para baixo para atualizar (`RefreshControl`).
- Drawer › Tabs › Stack + Modal ao mesmo tempo.

## Vídeo

Link do vídeo: (https://youtu.be/hjew1Qy6vLs?is=U4dTS4y9XRx95Bj4)
