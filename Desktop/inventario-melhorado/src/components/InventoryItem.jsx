import React from 'react';

function InventoryItem({ item, onEdit, onDelete }) {
  // Função para traduzir o tipo de equipamento
  const translateType = (type) => {
    const types = {
      'computador': 'Computador',
      'monitor': 'Monitor',
      'teclado': 'Teclado',
      'mouse': 'Mouse',
      'tablet': 'Tablet',
      'impressora': 'Impressora',
      'outro': 'Outro periférico'
    };
    return types[type] || type;
  };

  // Função para traduzir o status
  const translateStatus = (status) => {
    const statuses = {
      'disponivel': 'Disponível',
      'em_uso': 'Em Uso',
      'manutencao': 'Em Manutenção'
    };
    return statuses[status] || status;
  };

  // Função para determinar a classe do badge de status
  const getStatusBadgeClass = (status) => {
    const classes = {
      'disponivel': 'badge-success',
      'em_uso': 'badge-warning',
      'manutencao': 'badge-danger'
    };
    return `badge ${classes[status] || 'badge-secondary'}`;
  };

  // Formatar data de aquisição
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="inventory-item">
      <div className="inventory-item-header">
        <h3 className="inventory-item-title">{translateType(item.type)}</h3>
        <div className="inventory-item-actions">
          <button 
            onClick={() => onEdit(item)} 
            className="btn-secondary text-xs p-1"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          {onDelete && (
            <button 
              onClick={() => onDelete(item.id)} 
              className="btn-secondary text-xs p-1 text-red-500"
              title="Excluir"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <div className="inventory-item-detail">
        <strong>Modelo:</strong> {item.model}
      </div>
      <div className="inventory-item-detail">
        <strong>Nº Série:</strong> {item.serialNumber}
      </div>
      <div className="inventory-item-detail">
        <strong>Aquisição:</strong> {formatDate(item.acquisitionDate)}
      </div>
      
      {item.notes && (
        <div className="inventory-item-detail mt-2 text-gray-500 italic">
          "{item.notes}"
        </div>
      )}
      
      <div className="inventory-item-footer">
        <span className={getStatusBadgeClass(item.status)}>
          {translateStatus(item.status)}
        </span>
        <span className="text-xs text-gray-400">ID: {item.id.substring(0, 8)}</span>
      </div>
    </div>
  );
}

export default InventoryItem;
