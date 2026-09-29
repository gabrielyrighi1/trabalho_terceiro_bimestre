import { View, Text, StyleSheet } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📚 Catálogo de Livros</Text>
      <Text style={styles.texto}>App feito para o trabalho de ARQAPMO do IFSP.</Text>
      <Text style={styles.texto}>Os livros vêm da API do curso e os favoritos ficam salvos no celular com AsyncStorage.</Text>
      <Text style={styles.texto}>Navegação: Drawer › Tabs › Stack + Modal.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, color: '#1e3a8a' },
  texto: { fontSize: 16, marginBottom: 10, color: '#1f2937' },
});
