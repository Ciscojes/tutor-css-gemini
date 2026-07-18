const formulario = document.querySelector("#formulario");
const pregunta = document.querySelector("#pregunta");
const respuesta = document.querySelector("#respuesta");
const boton = document.querySelector("#boton");
const contador = document.querySelector("#contador");

pregunta.addEventListener("input", () => {
  contador.textContent = `${pregunta.value.length} / 3000`;
});

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const texto = pregunta.value.trim();

  if (!texto) {
    respuesta.textContent = "Escribe una pregunta antes de continuar.";
    return;
  }

  boton.disabled = true;
  boton.textContent = "Analizando...";
  respuesta.textContent = "Gemini está preparando la explicación...";

  try {
    const solicitud = await fetch("/api/preguntar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pregunta: texto
      })
    });

    const datos = await solicitud.json();

    if (!solicitud.ok) {
      throw new Error(datos.error || "Ocurrió un error desconocido.");
    }

    respuesta.textContent = datos.respuesta;
  } catch (error) {
    respuesta.textContent = `Error: ${error.message}`;
  } finally {
    boton.disabled = false;
    boton.textContent = "Analizar con Gemini";
  }
});
