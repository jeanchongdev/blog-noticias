import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xeogyyzp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Te contactaremos pronto.",
          confirmButtonColor: "#667eea",
        });
        setFormData({ nombre: "", email: "", mensaje: "" });
      } else {
        throw new Error("Error al enviar el formulario");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo enviar el mensaje. Por favor, intenta de nuevo.",
        confirmButtonColor: "#667eea",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="contact-header">
          <h1>Contáctanos</h1>
          <p>¿Tienes alguna pregunta? ¡Nos encantaría escucharte!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <div className="info-item">
              <FaEnvelope className="icon-medium" />
              <span>contacto@miblog.com</span>
            </div>
            <div className="info-item">
              <FaPhone className="icon-medium" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon-medium" />
              <span>123 Calle Principal, Ciudad</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="5"
                value={formData.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <FaPaperPlane className="icon-small" /> Enviar Mensaje
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;