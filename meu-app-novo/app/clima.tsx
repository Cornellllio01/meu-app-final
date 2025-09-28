import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme'; // Importando as cores
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native'; // Adicionado ActivityIndicator

export default function ClimaScreen() {
  const [mensagem, setMensagem] = useState('Obtendo localização...');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    console.log("Tela de Clima montada. Pronta para pedir localização.");
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Clima Atual</ThemedText>
      
      {carregando ? (
        <>
          <ActivityIndicator size="large" color={Colors.light.tint} />
          <Text style={styles.mensagemText}>{mensagem}</Text>
        </>
      ) : (
        <Text>Dados do clima aparecerão aqui!</Text>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  mensagemText: {
    fontSize: 16,
    color: '#9CA3AF',
  }
});
