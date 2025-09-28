import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function CalculadoraScreen() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handlePress = (button: string) => {
    if (!isNaN(Number(button))) {
      if (waitingForSecondValue) {
        setDisplayValue(button);
        setWaitingForSecondValue(false);
      } else {
        setDisplayValue(displayValue === '0' ? button : displayValue + button);
      }
      return;
    }
    if (button === '.') {
      if (!displayValue.includes('.')) {
        setDisplayValue(displayValue + '.');
      }
      return;
    }
    if (button === 'C') {
      setDisplayValue('0');
      setFirstValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
      return;
    }
    if (button === '±') {
      setDisplayValue((parseFloat(displayValue) * -1).toString());
      return;
    }
    if (button === '%') {
      setDisplayValue((parseFloat(displayValue) / 100).toString());
      return;
    }
    const performCalculation = () => {
      if (firstValue === null || operator === null) return;
      const secondValue = parseFloat(displayValue);
      let result = 0;
      switch (operator) {
        case '+': result = firstValue + secondValue; break;
        case '-': result = firstValue - secondValue; break;
        case '×': result = firstValue * secondValue; break;
        case '÷': result = firstValue / secondValue; break;
      }
      setDisplayValue(String(result));
      setFirstValue(result);
    };
    if (['+', '-', '×', '÷'].includes(button)) {
      if (operator && !waitingForSecondValue) {
        performCalculation();
      }
      setFirstValue(parseFloat(displayValue));
      setOperator(button);
      setWaitingForSecondValue(true);
      return;
    }
    if (button === '=') {
      performCalculation();
      setOperator(null);
      setWaitingForSecondValue(false);
    }
  };

  const getButtonColor = (button: string) => {
    if (['C', '±', '%'].includes(button)) return '#6B7280';
    if (['÷', '×', '-', '+', '='].includes(button)) return '#F59E0B';
    return '#374151';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        {/* 👇 A CORREÇÃO ESTÁ AQUI 👇 */}
        <Text 
          style={styles.displayText}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {displayValue}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[styles.button, { backgroundColor: getButtonColor(button) }, button === '0' && styles.zeroButton]}
                onPress={() => handlePress(button)}>
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827', justifyContent: 'flex-end' },
  displayContainer: { paddingHorizontal: 20, paddingVertical: 40, alignItems: 'flex-end', justifyContent: 'flex-end' },
  displayText: { color: 'white', fontSize: 80, fontWeight: '300' }, // A fonte base continua 80
  buttonsContainer: { paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 },
  button: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', margin: 5 },
  buttonText: { color: 'white', fontSize: 32 },
  zeroButton: { width: 170, alignItems: 'flex-start', paddingLeft: 35 },
});
