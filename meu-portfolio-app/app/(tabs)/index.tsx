import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ContadorScreen() {
  const [contador, setContador] = useState(0);
  const corContador = contador > 0 ? '#10B981' : contador < 0 ? '#EF4444' : '#6B7280';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador</Text>
      <View style={styles.counterDisplay}>
        <TouchableOpacity style={[styles.counterButton, { backgroundColor: '#EF4444' }]} onPress={() => setContador(c => c - 1)}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={[styles.counterNumber, { color: corContador }]}>{contador}</Text>
        <TouchableOpacity style={[styles.counterButton, { backgroundColor: '#10B981' }]} onPress={() => setContador(c => c + 1)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.counterButton, styles.resetButton]} onPress={() => setContador(0)}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 30, padding: 20, backgroundColor: '#f0f0f0' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  counterDisplay: { flexDirection: 'row', alignItems: 'center', gap: 25 },
  counterButton: { width: 65, height: 65, borderRadius: 32.5, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  resetButton: { backgroundColor: '#8B5CF6', width: 120, height: 50, borderRadius: 25 },
  buttonText: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  counterNumber: { fontSize: 48, fontWeight: 'bold', textAlign: 'center', minWidth: 80 },
});
