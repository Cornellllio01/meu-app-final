import { Tabs } from 'expo-router';
import React from 'react';

// Para simplificar, não vamos adicionar ícones ainda.
// Faremos isso depois que tudo estiver funcionando.

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Contador',
        }}
      />
      <Tabs.Screen
        name="tarefas"
        options={{
          title: 'Tarefas',
        }}
      />
      <Tabs.Screen
        name="calculadora"
        options={{
          title: 'Calculadora',
        }}
      />
      <Tabs.Screen
        name="clima"
        options={{
          title: 'Clima',
        }}
      />
    </Tabs>
  );
}
