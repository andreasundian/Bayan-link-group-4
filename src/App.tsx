/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import ServicesPage from './pages/services/ServicesPage';
import MunicipalityPage from './pages/municipality/MunicipalityPage';
import NewsPage from './pages/news/NewsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="municipality" element={<MunicipalityPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

