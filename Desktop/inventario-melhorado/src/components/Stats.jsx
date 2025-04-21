import React from 'react';

function Stats({ inventory }) {
  // Calcular estatísticas
  const totalItems = inventory.length;
  
  const statusCounts = {
    disponivel: 0,
    em_uso: 0,
    manutencao: 0
  };
  
  inventory.forEach(item => {
    if (statusCounts.hasOwnProperty(item.status)) {
      statusCounts[item.status]++;
    }
  });
  
  // Calcular tipos de equipamentos
  const typeCounts = {};
  inventory.forEach(item => {
    typeCounts[item.type] = (typeCounts[item.type] || 0) + 1;
  });
  
  // Encontrar o tipo mais comum
  let mostCommonType = '';
  let maxCount = 0;
  
  Object.entries(typeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      mostCommonType = type;
      maxCount = count;
    }
  });
  
  // Traduzir o tipo mais comum
  const translateType = (type) => {
    const types = {
      'computador': 'Computadores',
      'monitor': 'Monitores',
      'teclado': 'Teclados',
      'mouse': 'Mouses',
      'tablet': 'Tablets',
      'impressora': 'Impressoras',
      'outro': 'Outros periféricos'
    };
    return types[type] || type;
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-title">Total de Equipamentos</div>
        <div className="stat-value">{totalItems}</div>
        <div className="stat-description">Itens cadastrados no inventário</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title">Disponíveis</div>
        <div className="stat-value">{statusCounts.disponivel}</div>
        <div className="stat-description">
          {Math.round((statusCounts.disponivel / totalItems) * 100) || 0}% do total
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title">Tipo mais comum</div>
        <div className="stat-value">{translateType(mostCommonType)}</div>
        <div className="stat-description">
          {maxCount} {maxCount === 1 ? 'unidade' : 'unidades'}
        </div>
      </div>
    </div>
  );
}

export default Stats;
