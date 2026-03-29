// components/word-display.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/**
 * INTERFACES (TypeScript)
 * Definimos qué tipo de datos espera recibir este componente.
 */
interface WordDisplayProps {
  hiddenLines: string[]; // Espera un arreglo de textos, ej: ["_", "A", "_"]
}

/**
 * COMPONENTE: WordDisplay
 * Se encarga de dibujar las líneas y las letras adivinadas con un estilo limpio.
 */
export default function WordDisplay({ hiddenLines }: WordDisplayProps) {
  // Si aún no hay datos cargados, no dibujamos nada
  if (!hiddenLines || hiddenLines.length === 0) return null;

  return (
    <View style={styles.container}>
      {hiddenLines.map((char: string, index: number) => {
        // Determinamos si esta posición ya fue adivinada
        const isGuessed = char !== "_";

        return (
          <View key={index} style={styles.letterWrapper}>
            {/* La letra (invisible si es un guion bajo) */}
            <Text style={[
              styles.letterText,
              isGuessed ? styles.textGuessed : styles.textHidden
            ]}>
              {isGuessed ? char : ""}
            </Text>

            {/* La línea minimalista debajo de la letra */}
            <View style={[
              styles.line,
              isGuessed ? styles.lineGuessed : styles.lineHidden
            ]} />
          </View>
        );
      })}
    </View>
  );
}

// --- ESTILOS MINIMALISTAS ---
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que la palabra salte a la siguiente línea si es muy larga
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10, // Espacio entre cada letra/línea
  },
  letterWrapper: {
    alignItems: 'center',
    width: 30, // Ancho fijo para mantener la simetría
  },
  letterText: {
    fontSize: 28,
    fontFamily: 'sans-serif',
    fontWeight: '600',
    marginBottom: 4,
  },
  textGuessed: {
    color: '#333333', // Gris muy oscuro para un diseño limpio
  },
  textHidden: {
    color: 'transparent', // Oculta la letra pero mantiene el espacio
  },
  line: {
    height: 3, // Línea fina y elegante
    width: '100%',
    borderRadius: 2,
  },
  lineHidden: {
    backgroundColor: '#CCCCCC', // Gris claro para las letras por adivinar
  },
  lineGuessed: {
    backgroundColor: '#4CAF50', // Verde para los aciertos
  }
});