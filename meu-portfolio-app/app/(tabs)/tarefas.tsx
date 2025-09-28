import React, { useState } from 'react';
import { Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Tarefa {
  id: string;
  texto: string;
}

export default function TarefasScreen() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [textoInput, setTextoInput] = useState('');

  const adicionarTarefa = () => {
    if (textoInput.trim().length === 0) {
      return; // Não adiciona tarefas vazias
    }
    
    const novaTarefa: Tarefa = {
      id: Date.now().toString(), // ID único baseado no tempo atual
      texto: textoInput,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTextoInput(''); // Limpa o campo de texto
    Keyboard.dismiss(); // Fecha o teclado
  };

  const removerTarefa = (id: string) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          value={textoInput}
          onChangeText={setTextoInput}
        />
        <Button title="Adicionar" onPress={adicionarTarefa} />
      </View>

      <FlatList
        style={styles.list}
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.texto}</Text>
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.removeButton}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhuma tarefa ainda.</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  removeButton: {
    fontSize: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
});
