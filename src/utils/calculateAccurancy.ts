// Função auxiliar para calcular a pontuação geral com base na distância total
export const calculateOverallAccuracy = (
  totalDistance: number,
  noteCount: number,
): number => {
  // Normaliza a distância média em relação ao número de notas
  const averageDistance = totalDistance / noteCount;

  // Calcula a pontuação com base na distância média
  const accuracyPercentage = Math.max(100 - averageDistance * 10, 0);

  return accuracyPercentage;
};

// Função auxiliar para calcular a distância circular entre duas notas
export const calculateCircularNoteDistance = (
  note1: string,
  note2: string,
  notesPossibilities: string[],
): number => {
  const index1 = notesPossibilities.indexOf(note1);
  const index2 = notesPossibilities.indexOf(note2);

  // Calcula a distância circular considerando o círculo de quintas
  const distance = Math.min(
    Math.abs(index1 - index2),
    notesPossibilities.length - Math.abs(index1 - index2),
  );

  return distance;
};
