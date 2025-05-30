import { useState } from "react";
import { FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { loginAdmin } from "../services/authService";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginAdmin(formData.email, formData.password);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "¡Acceso concedido!",
        text: "Bienvenido al panel de administración",
        confirmButtonColor: "#667eea",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Email o contraseña incorrectos",
        confirmButtonColor: "#667eea",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="container">
        <div className="login-box">
          <h2>
            <FaLock className="icon-medium" /> Acceso de Administrador
          </h2>
          <p>Ingresa tus credenciales para acceder al panel de administración</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa la contraseña"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                "Iniciando sesión..."
              ) : (
                <>
                  <FaSignInAlt className="icon-small" /> Ingresar
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;