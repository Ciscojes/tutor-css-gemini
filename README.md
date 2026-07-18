# Tutor de CSS con Gemini

Proyecto educativo para aprender a conectar una página web con la API de Gemini
usando Google AI Studio, JavaScript, Node.js y Express.

## Qué aprenderás

1. Crear una API key en Google AI Studio.
2. Guardar la clave en una variable de entorno.
3. Enviar información desde el navegador con `fetch()`.
4. Crear una ruta POST en Express.
5. Consultar Gemini con `@google/genai`.
6. Mostrar la respuesta de la IA en el HTML.
7. Manejar estados de carga y errores.

## Requisitos

- Node.js 18 o superior.
- Una API key de Google AI Studio.
- Visual Studio Code.
- Terminal de PowerShell, CMD, Git Bash o WSL.

## Instalación

Abre una terminal dentro de la carpeta del proyecto y ejecuta:

```bash
npm install
```

Copia el archivo `.env.example` y llámalo `.env`.

En PowerShell:

```powershell
Copy-Item .env.example .env
```

En WSL, Git Bash, Linux o macOS:

```bash
cp .env.example .env
```

Abre `.env` y reemplaza:

```env
GEMINI_API_KEY=PEGA_AQUI_TU_API_KEY
```

por tu clave real.

## Ejecutar el proyecto

```bash
npm run dev
```

Después abre:

```text
http://localhost:3000
```

No abras `index.html` directamente con Live Server. El proyecto necesita el
servidor Node.js porque la API key se utiliza en el backend.

## Flujo del proyecto

```text
Usuario
  ↓
public/script.js
  ↓ POST /api/preguntar
server.js
  ↓
Gemini API
  ↓
server.js devuelve JSON
  ↓
La respuesta aparece en index.html
```

## Pruebas recomendadas

- ¿Qué hace `display: flex`?
- ¿Cuál es la diferencia entre `margin` y `padding`?
- ¿Por qué no funciona `align-item: center`?
- Corrige este código: `.caja { display: grid; grip-template-columns: 1fr 1fr; }`
- Dame una pista para crear una barra de navegación con Flexbox.

## Reto adicional

Cuando el proyecto funcione:

1. Agrega botones de preguntas rápidas.
2. Permite elegir entre HTML, CSS y JavaScript.
3. Guarda las últimas cinco preguntas en `localStorage`.
4. Agrega un botón para limpiar la respuesta.
5. Renderiza Markdown de forma segura.

## Seguridad

Nunca subas `.env` a GitHub. El archivo ya está incluido en `.gitignore`.
La API key debe permanecer en el servidor y no debe colocarse en
`public/script.js`.
