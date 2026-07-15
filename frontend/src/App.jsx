import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;