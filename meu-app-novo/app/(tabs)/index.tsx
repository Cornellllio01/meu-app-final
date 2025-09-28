import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function ContadorScreen() {
  const [contador, setContador] = useState(0);

  const corContador = contador > 0 ? '#10B981' : contador < 0 ? '#EF4444' : '#6B7280';

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Contador Personalizado 🎨</ThemedText>

      <ThemedView style={styles.counterDisplay}>
        <TouchableOpacity 
          style={[styles.counterButton, { backgroundColor: '#EF4444' }]} 
          onPress={() => setContador(contador - 1)}
        >
          <ThemedText style={styles.buttonText}>-</ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.counterNumber, { color: corContador }]}>
          {contador}
        </ThemedText>

        <TouchableOpacity 
          style={[styles.counterButton, { backgroundColor: '#10B981' }]} 
          onPress={() => setContador(contador + 1)}
        >
          <ThemedText style={styles.buttonText}>+</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity 
        style={[styles.counterButton, styles.resetButton]} 
        onPress={() => setContador(0)}
      >
        <ThemedText style={styles.buttonText}>Reset</ThemedText>
      </TouchableOpacity>

      <ThemedView style={styles.infoContainer}>
        <ThemedText style={styles.infoText}>
          {contador === 0 && "Neutro - Comece a contar!"}
          {contador > 0 && `Positivo: +${contador}`}
          {contador < 0 && `Negativo: ${contador}`}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 30,
    padding: 20,
  },
  counterDisplay: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 25,
    borderRadius: 20,
  },
  counterButton: { 
    width: 65, 
    height: 65, 
    borderRadius: 32.5, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  resetButton: { 
    backgroundColor: '#8B5CF6', 
    width: 120,
    height: 50,
    borderRadius: 25,
  },
  buttonText: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: 'bold' 
  },
  counterNumber: { 
    fontSize: 48, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    minWidth: 80,
  },
  infoContainer: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
});