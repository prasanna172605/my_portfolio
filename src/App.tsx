import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { SnuggleMusixLanding } from './pages/SnuggleMusixLanding';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Canonical lowercase route */}
          <Route path="/snuggle-musix" element={<SnuggleMusixLanding />} />
          
          {/* Redirect capitalized legacy routes to canonical lowercase */}
          <Route path="/Snuggle-Musix" element={<Navigate to="/snuggle-musix" replace />} />
          <Route path="/SnuggleMusix" element={<Navigate to="/snuggle-musix" replace />} />
          <Route path="/snugglemusix" element={<Navigate to="/snuggle-musix" replace />} />
          
          {/* Root Portfolio */}
          <Route path="/*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
