# Gráficas App

App web para subir archivos Excel/CSV y generar gráficas interactivas y bonitas.

## Características

- 📁 **Subida de archivos**: Arrastra o selecciona archivos Excel, CSV, ODS
- 📊 **Gráficas interactivas**: Barras, líneas, pastel, dona, radar, área polar, dispersión
- 🎨 **Paleta de colores**: Elige entre 5 esquemas de colores
- 🔀 **Arrastra columnas**: Selecciona qué columnas usar para X e Y
- 👁️ **Vista previa**: Tabla con los primeros registros
- ⚡ **Rendimiento**: Carga lazy de la librería de Excel para chunks pequeños

## Tech Stack

- Vite + TypeScript
- Chart.js para gráficas
- SheetJS (xlsx) para parsear Excel
- Vitest + jsdom para tests
- Arquitectura MVC
- Arrow functions en todo el código

## Scripts

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm test         # Tests en watch mode
pnpm test:run     # Tests una sola vez
```

## Uso

1. Ejecuta `pnpm dev`
2. Abre http://localhost:5173
3. Arrastra un archivo Excel o CSV
4. Selecciona el tipo de gráfica, columnas X/Y y paleta de colores
5. ¡Listo!
