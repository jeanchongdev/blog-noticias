export const formatearFecha = (fecha) => {
  const ahora = new Date();
  const fechaNoticia = new Date(fecha);
  const diferencia = ahora - fechaNoticia;

  const segundos = Math.floor(diferencia / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (segundos < 60) {
    return `hace ${segundos}s`;
  } else if (minutos < 60) {
    return `hace ${minutos}m`;
  } else if (horas < 24) {
    return `hace ${horas}h`;
  } else if (dias <= 5) {
    return `hace ${dias}d`;
  } else {
    // Después de 5 días, mostrar fecha completa
    return fechaNoticia.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
};