import './App.css';
import ImageUpload from "./components/ImageUpload";

export default function App() {
  const handleUpload = (file: File | null) => {
    // handle the uploaded file (example: log it)
    console.log('Uploaded file:', file);
  };

  return (
    <>
      <ImageUpload onUpload={handleUpload} />
    </>
  )
}