
export const saveInventory = (inventory) => {
  localStorage.setItem('inventory', JSON.stringify(inventory));
};

export const loadInventory = () => {
  const data = localStorage.getItem('inventory');
  return data ? JSON.parse(data) : [];
};
