import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Alert, Animated, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const STORAGE_KEY = '@tarefas_app';

export default function TarefasScreen() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState<{ id: string; texto: string; concluida: boolean }[]>([]);
  const [animValue] = useState(new Animated.Value(1));

  useEffect(() => {
    carregarTarefas();
  }, []);

  useEffect(() => {
    salvarTarefas();
  }, [tarefas]);

  async function carregarTarefas() {
    try {
      const dados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dados) setTarefas(JSON.parse(dados));
    } catch (error) {
      console.log('Erro ao carregar tarefas');
    }
  }

  async function salvarTarefas() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    } catch (error) {
      console.log('Erro ao salvar tarefas');
    }
  }

  function adicionarTarefa() {
    if (!tarefa.trim()) return;
    
    Animated.sequence([
      Animated.timing(animValue, { toValue: 1.2, duration: 100, useNativeDriver: true }),
      Animated.timing(animValue, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    
    setTarefas([...tarefas, { id: Date.now().toString(), texto: tarefa, concluida: false }]);
    setTarefa('');
  }

  function alternarConcluida(id: string) {
    setTarefas(tarefas.map(t => (t.id === id ? { ...t, concluida: !t.concluida } : t)));
  }

  function removerTarefa(id: string) {
    Alert.alert(
      'Remover Tarefa',
      'Tem certeza que deseja remover esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: () => {
          setTarefas(tarefas.filter(t => t.id !== id));
        }}
      ]
    );
  }

  const tarefasPendentes = tarefas.filter(t => !t.concluida).length;
  const tarefasConcluidas = tarefas.filter(t => t.concluida).length;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Lista de Tarefas</ThemedText>
      
      <ThemedView style={styles.statsContainer}>
        <ThemedView style={[styles.statItem, { backgroundColor: '#FEF3C7' }]}>
          <ThemedText style={[styles.statNumber, { color: '#D97706' }]}>{tarefasPendentes}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: '#D97706' }]}>Pendentes</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statItem, { backgroundColor: '#D1FAE5' }]}>
          <ThemedText style={[styles.statNumber, { color: '#065F46' }]}>{tarefasConcluidas}</ThemedText>
          <ThemedText style={[styles.statLabel, { color: '#065F46' }]}>Concluídas</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor="#9CA3AF"
          value={tarefa}
          onChangeText={setTarefa}
          onSubmitEditing={adicionarTarefa}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarTarefa}>
          <Animated.View style={{ transform: [{ scale: animValue }] }}>
            <ThemedText style={styles.addButtonText}>+</ThemedText>
          </Animated.View>
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View 
            style={[
              styles.taskItem, 
              { backgroundColor: item.concluida ? '#F3F4F6' : '#FFFFFF' }
            ]}
          >
            <TouchableOpacity 
              style={styles.taskContent}
              onPress={() => alternarConcluida(item.id)}
            >
              <ThemedView style={[
                styles.checkbox,
                { backgroundColor: item.concluida ? '#10B981' : 'transparent' }
              ]}>
                {item.concluida && <ThemedText style={styles.checkmark}>✓</ThemedText>}
              </ThemedView>
              
              <ThemedText
                style={[
                  styles.taskText, 
                  item.concluida ? styles.taskDone : styles.taskPending
                ]}
              >
                {item.texto}
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.deleteButton}
              onPress={() => removerTarefa(item.id)}
            >
              <ThemedText style={styles.deleteText}>🗑️</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>Nenhuma tarefa ainda</ThemedText>
            <ThemedText style={styles.emptySubtext}>Adicione uma tarefa para começar!</ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    gap: 12 
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  inputContainer: { 
    flexDirection: 'row', 
    gap: 10,
    marginBottom: 10,
  },
  input: { 
    flex: 1, 
    borderWidth: 2, 
    borderColor: '#E5E7EB', 
    borderRadius: 12, 
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  addButton: { 
    backgroundColor: '#8B5CF6', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  taskItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskText: { 
    fontSize: 16,
    flex: 1,
  },
  taskDone: { 
    textDecorationLine: 'line-through', 
    color: '#9CA3AF',
    opacity: 0.7,
  },
  taskPending: { 
    color: '#1F2937',
    fontWeight: '500',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    opacity: 0.6,
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.5,
  },
});