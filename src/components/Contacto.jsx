import { useState } from "react";
import emailjs from "@emailjs/browser";
import Aviso from "./Aviso";

export default function Contacto() {
   // Estados del formulario
   const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
   // Estado de espera de envío
   const [submitting, setSubmitting] = useState(false);
   // Estado del aviso de confirmacion del Email
   const [aviso, setAviso] = useState({ open: false, ok: true, msg: "" });

   // Actualizar campos del formulario, evita leer un form viejo
   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   // Enviar con EmailJS
   async function handleSubmit(e) {
      e.preventDefault();

      // Validaciones
      if (!form.nombre || !form.email || !form.mensaje) {
         setAviso("Todos los campos son obligatorios.");
         return;
      }

      try {
         // Enviar el correo
         setSubmitting(true);
         await emailjs.send(
            "service_igoqkjb",
            "template_ap4r4xe",
            {
               name: form.nombre,
               email: form.email,
               message: form.mensaje,
               title: "TP N°3 - Aquiles Cancinos",
            },
            "xIHLw3LRX7_zzaMsq"
         );
         setForm({ nombre: "", email: "", mensaje: "" });
         setAviso({
            open: true,
            ok: true,
            msg: "Correo enviado correctamente.",
         });
         // Error al enviar el Email
      } catch (err) {
         console.error(err);
         setAviso({
            open: true,
            ok: false,
            msg: "Ocurrió un error al enviar el correo. Intenta nuevamente.",
         });
         //Si no envio el Email, habilito el boton de enviar
      } finally {
         setSubmitting(false);
      }
   }

   return (
      <div className="page-center">
         <main className="card card-compact">
            {/* Formulario */}
            <h2>Contacto</h2>
            <form onSubmit={handleSubmit} className="form">
               <label className="field">
                  <span>Nombre</span>
                  <input
                     type="text"
                     name="nombre"
                     value={form.nombre}
                     onChange={handleChange}
                     disabled={submitting}
                     required
                  />
               </label>

               <label className="field">
                  <span>Dirección de correo</span>
                  <input
                     type="email"
                     name="email"
                     value={form.email}
                     onChange={handleChange}
                     disabled={submitting}
                     required
                  />
               </label>

               <label className="field">
                  <span>Mensaje</span>
                  <textarea
                     name="mensaje"
                     rows="5"
                     value={form.mensaje}
                     onChange={handleChange}
                     disabled={submitting}
                     required
                  />
               </label>

               <button className="btn" type="submit" disabled={submitting}>
                  {submitting ? (
                     <>
                        <span className="spinner" /> Enviando…
                     </>
                  ) : (
                     "Enviar"
                  )}
               </button>
            </form>
         </main>

         {/* Aviso de Confirmacion o Error */}
         <Aviso
            open={aviso.open}
            title={aviso.ok ? "Listo" : "Hubo un problema"}
            onClose={() => setAviso({ ...aviso, open: false })}
         >
            <p className={aviso.ok ? "ok" : "error"}>{aviso.msg}</p>
         </Aviso>
      </div>
   );
}
