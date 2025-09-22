import "./index.css";
import CargaImagen from "./components/CargaImagen";
import Contacto from "./components/Contacto";
import { Routes, Route, Link } from "react-router-dom";
export default function App() {
   return (
      <div>
         {/* Menú de navegación */}
         <nav className="navbar">
            <Link to="/">TP N°2 </Link>
            <Link to="/contacto">Contacto</Link>
         </nav>

         {/* Rutas */}
         <Routes>
            <Route
               path="/"
               element={
                  <>
                     <h1>TP N°2: Aquiles Cancinos</h1>
                     <h2>Subir imagen usando File API y Drag & Drop</h2>
                     <CargaImagen />
                  </>
               }
            />
            <Route path="/contacto" element={<Contacto />} />
         </Routes>
      </div>
   );
}
