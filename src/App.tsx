import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ImageUpload from "./components/ImageUpload";
import Result from './components/Result';


export default function App() {
  const handleUpload = (file: File | null) => {
    // handle the uploaded file (example: log it)
    console.log('Uploaded file:', file);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ImageUpload onUpload={handleUpload} />} />
        <Route
          path="/result"
          element={
            <Result
              diagnosis="Nghi ngờ viêm phổi"
              probability={0.85}
              originalImage=""
              gradcamImage=""
            />
          }
        />
      </Routes>
    </Router>
  );
}