import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './lib/apollo';
import { LanguageProvider } from './lib/language';
import { BrandsPage } from './pages/BrandsPage';
import { ModelsPage } from './pages/ModelsPage';
import { ModelDetailsPage } from './pages/ModelDetailsPage';
import './index.css';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate to="/brands" replace />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/brands/:brandId" element={<ModelsPage />} />
              <Route path="/brands/:brandId/models/:modelId" element={<ModelDetailsPage />} />
              <Route path="*" element={<Navigate to="/brands" replace />} />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </ApolloProvider>
  );
}

export default App;