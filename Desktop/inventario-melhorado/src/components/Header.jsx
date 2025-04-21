import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-800">Inventário de Equipamentos</h1>
          </div>
          <div className="text-sm text-gray-500">
            Sistema de Gerenciamento
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
