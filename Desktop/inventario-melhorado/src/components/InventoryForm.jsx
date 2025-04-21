import React, { useState, useEffect } from 'react';
import { saveInventory } from '../utils/storage';

function InventoryForm({ onClose, editItem, inventory, setInventory }) {
  const [formData, setFormData] = useState({
    type: '',
    model: '',
    serialNumber: '',
    acquisitionDate: '',
    status: 'disponivel',
    notes: ''
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      ...formData,
      id: editItem ? editItem.id : Date.now().toString()
    };

    let updatedInventory;
    if (editItem) {
      updatedInventory = inventory.map(item =>
        item.id === editItem.id ? newItem : item
      );
    } else {
      updatedInventory = [...inventory, newItem];
    }

    setInventory(updatedInventory);
    saveInventory(updatedInventory);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="text-xl font-semibold">
            {editItem ? 'Editar Equipamento' : 'Adicionar Equipamento'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label className="form-label">
              Tipo de Equipamento
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Selecione o tipo</option>
              <option value="computador">Computador</option>
              <option value="monitor">Monitor</option>
              <option value="teclado">Teclado</option>
              <option value="mouse">Mouse</option>
              <option value="tablet">Tablet</option>
              <option value="impressora">Impressora</option>
              <option value="outro">Outros periféricos</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Marca/Modelo
            </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Ex: Dell Latitude 5420"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Número de Série
            </label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Ex: SN12345678"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Data de Aquisição
            </label>
            <input
              type="date"
              name="acquisitionDate"
              value={formData.acquisitionDate}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="disponivel">Disponível</option>
              <option value="em_uso">Em Uso</option>
              <option value="manutencao">Em Manutenção</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Observações
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              rows="3"
              placeholder="Informações adicionais sobre o equipamento..."
            />
          </div>
          
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {editItem ? 'Salvar Alterações' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InventoryForm;
