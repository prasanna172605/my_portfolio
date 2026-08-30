import { Routes, Route } from 'react-router-dom';
import { SnuggleMusixLanding } from './pages/SnuggleMusixLanding';
import { Portfolio } from './pages/Portfolio';

export default function App() {
  return (
    <Routes>
      <Route path="/Snuggle-Musix" element={<SnuggleMusixLanding />} />
      <Route path="/*" element={<Portfolio />} />
    </Routes>
  );
}
