import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateBirthday from './pages/CreateBirthday';
import BirthdayExperience from './pages/BirthdayExperience';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/create" replace />} />
        <Route path="/create" element={<CreateBirthday />} />
        <Route path="/experience/:id" element={<BirthdayExperience />} />
      </Routes>
    </BrowserRouter>
  );
}
