import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient'; // 👈 1. IMPORTAMOS O GRADIENTE
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';

const API_KEY = "19fb50294c93902348b070e5f515f347";

interface ClimaData {
  name: string;
  main: { temp: number; feels_like: number; humidity: number; };
  weather: [{ description: string; icon: string; }];
}

export default function ClimaScreen() {
  const [mensagem, setMensagem] = useState('Obtendo localização...');
  const [carregando, setCarregando] = useState(true);
  const [clima, setClima] = useState<ClimaData | null>(null);

  const obterClima = async () => {
    // ... (A função obterClima continua exatamente igual)
    setCarregando(true);
    setMensagem('Pedindo permissão de localização...');
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setMensagem('Permissão para acessar a localização foi negada.');
      setCarregando(false);
      return;
    }
    setMensagem('Obtendo coordenadas...');
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setMensagem('Buscando dados do clima...');
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=pt_br` );
      const data = await response.json();
      if (response.ok) {
        setClima(data);
      } else {
        setMensagem(`Erro ao buscar clima: ${data.message || 'verifique a chave da API'}`);
      }
    } catch (error) {
      setMensagem('Não foi possível obter a localização ou os dados do clima.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => { obterClima(); }, []);

  const renderContent = () => {
    if (carregando) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.mensagemText}>{mensagem}</Text>
        </View>
      );
    }
    if (clima) {
      return (
        <View style={styles.climaContainer}>
          <ThemedText type="title" style={styles.cidadeText}>{clima.name}</ThemedText>
          <Image style={styles.weatherIcon} source={{ uri: `https://openweathermap.org/img/wn/${clima.weather[0].icon}@4x.png` }} />
          <Text style={styles.tempText}>{Math.round(clima.main.temp )}°C</Text>
          <Text style={styles.descriptionText}>{clima.weather[0].description}</Text>
          <Text style={styles.detailsText}>Sensação térmica: {Math.round(clima.main.feels_like)}°C</Text>
          <Text style={styles.detailsText}>Umidade: {clima.main.humidity}%</Text>
        </View>
      );
    }
    return (
      <View style={styles.centered}>
        <Text style={styles.mensagemText}>{mensagem}</Text>
        <Button title="Tentar Novamente" onPress={obterClima} color="#FFFFFF" />
      </View>
    );
  };

  return (
    // 👈 2. USAMOS O GRADIENTE COMO COMPONENTE PRINCIPAL
    <LinearGradient
      colors={['#4A90E2', '#0E4B8A']} // Gradiente de azul claro para escuro
      style={styles.container}
    >
      {renderContent()}
    </LinearGradient>
  );
}

// 👈 3. AJUSTAMOS OS ESTILOS PARA O NOVO FUNDO
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  centered: { justifyContent: 'center', alignItems: 'center', gap: 20 },
  mensagemText: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', opacity: 0.8 },
  climaContainer: { alignItems: 'center', gap: 10 },
  cidadeText: { color: '#FFFFFF' },
  weatherIcon: { width: 150, height: 150 },
  tempText: { fontSize: 64, fontWeight: 'bold', color: '#FFFFFF' },
  descriptionText: { fontSize: 20, textTransform: 'capitalize', color: '#FFFFFF', opacity: 0.9 },
  detailsText: { fontSize: 16, color: '#FFFFFF', opacity: 0.8 },
});
y