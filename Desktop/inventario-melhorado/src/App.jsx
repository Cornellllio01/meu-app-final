import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InventoryForm from './components/InventoryForm';
import InventoryItem from './components/InventoryItem';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import Stats from './components/Stats';
import { loadInventory, saveInventory } from './utils/storage';

function App() {
  const [inventory, setInventory] = useState(loadInventory());
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const handleAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setShowConfirmDelete(id);
  };

  const confirmDelete = () => {
    if (showConfirmDelete) {
      const updatedInventory = inventory.filter(item => item.id !== showConfirmDelete);
      setInventory(updatedInventory);
      saveInventory(updatedInventory);
      setShowConfirmDelete(null);
    }
  };

  // Filtrar inventário com base na busca e filtros
  const filteredInventory = inventory.filter(item => {
    // Filtro de busca
    const searchMatch = 
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filtro de status
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    
    return searchMatch && statusMatch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container py-6 flex-grow">
        {inventory.length > 0 && (
          <>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">Gerenciar Equipamentos</h2>
              <button
                onClick={handleAdd}
                className="btn btn-success"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Adicionar Equipamento
              </button>
            </div>
            
            <Stats inventory={inventory} />
            
            <SearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />
            
            <div className="filters">
              <span 
                className={`filter-item ${filterStatus === 'all' ? 'active' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                Todos
              </span>
              <span 
                className={`filter-item ${filterStatus === 'disponivel' ? 'active' : ''}`}
                onClick={() => setFilterStatus('disponivel')}
              >
                Disponíveis
              </span>
              <span 
                className={`filter-item ${filterStatus === 'em_uso' ? 'active' : ''}`}
                onClick={() => setFilterStatus('em_uso')}
              >
                Em Uso
              </span>
              <span 
                className={`filter-item ${filterStatus === 'manutencao' ? 'active' : ''}`}
                onClick={() => setFilterStatus('manutencao')}
              >
                Em Manutenção
              </span>
            </div>
            
            {filteredInventory.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum equipamento encontrado com os filtros atuais.</p>
                <button 
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="inventory-grid">
                {filteredInventory.map((item) => (
                  <InventoryItem 
                    key={item.id} 
                    item={item} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
        
        {inventory.length === 0 && (
          <EmptyState onAddClick={handleAdd} />
        )}
        
        {showForm && (
          <InventoryForm
            onClose={() => setShowForm(false)}
            editItem={editItem}
            inventory={inventory}
            setInventory={setInventory}
          />
        )}
        
        {showConfirmDelete && (
          <div className="modal-backdrop">
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="text-xl font-semibold">Confirmar Exclusão</h2>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir este equipamento do inventário?</p>
                <p className="text-sm text-red-500 mt-2">Esta ação não pode ser desfeita.</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowConfirmDelete(null)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn btn-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container text-center text-gray-500 text-sm">
          Sistema de Inventário &copy; {new Date().getFullYear()} - Versão 2.0
        </div>
      </footer>
    </div>
  );
}

export default App;
