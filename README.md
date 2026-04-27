# 📊 Easy Graph

> Arrastra tu Excel y genera gráficas hermosas en segundos. Sin código. Sin límites.

![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)

---

## ✨ Demo

Sube cualquier archivo **Excel, CSV o Google Sheets** y convierte tus datos en gráficas interactivas con un solo click.

![preview](https://img.shields.io/badge/🖤%20Modo%20oscuro%20puro-000000?style=for-the-badge&color=000000)

---

## 🚀 Características

| Feature | Descripción |
|---------|-------------|
| 📁 **Drag & Drop** | Arrastra archivos Excel, CSV o ODS de cualquier tamaño |
| 📊 **10 tipos de gráficas** | Barras verticales, barras horizontales, líneas, área, pastel, dona, radar, área polar, dispersión y barras + línea |
| 🎨 **15 paletas de colores** | Por defecto, Google, Google Pastel, Google Vivo, Berry, Coral, Ejecutivo, Océano, Pastel, Real, Pizarra, 3D, Vino, Medianoche |
| 🖤 **Fondo negro puro** | Interfaz moderna `#000000` con alto contraste |
| 🏷️ **Valores sobre barras** | Toggle para mostrar/ocultar los números encima de cada barra |
| 🌞 **Modo claro de gráfica** | Cambia solo la gráfica a fondo blanco para descargas limpias |
| 📥 **Descarga JPG** | Exporta tu gráfica como imagen con un click |
| 🔀 **Columnas arrastrables** | Selecciona libremente qué columnas usar para cada eje |
| ⚡ **Auto-update** | Cada cambio en la configuración actualiza la gráfica al instante |

---

## 🛠️ Tech Stack

- ⚡ **Vite** — Build ultra rápido
- 🔷 **TypeScript** — Tipado estricto
- 📈 **Chart.js** + **chartjs-plugin-datalabels** — Gráficas potentes
- 📑 **SheetJS (xlsx)** — Parseo de Excel en el navegador
- 🧪 **Vitest** + **jsdom** — Tests unitarios
- 🏗️ **MVC** — Arquitectura limpia

---

## 📦 Instalación

```bash
git clone https://github.com/pmmachadov/easy-graph.git
cd easy-graph
pnpm install
pnpm dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 🧪 Tests

```bash
pnpm test        # Modo watch
pnpm test:run    # Una sola vez
```

---

## 📋 Uso rápido

1. **Arrastra** un archivo Excel o CSV a la zona punteada
2. **Selecciona** el tipo de gráfica en el sidebar
3. **Elige** las columnas para los ejes X e Y
4. **Personaliza** colores, título, modo claro/oscuro
5. **Descarga** tu gráfica como JPG

### Archivos de ejemplo incluidos

| Archivo | Contenido |
|---------|-----------|
| `datos-ejemplo.xlsx` | Ventas mensuales con meta comparativa |
| `datos-ejemplo2.xlsx` | Productos tech por trimestre |

---

## 🎨 Tipos de gráficas

| Tipo | Ideal para |
|------|------------|
| 📊 Barras Verticales | Comparar categorías |
| 📊 Barras Horizontales | Categorías con nombres largos |
| 📈 Líneas | Tendencias temporales |
| 🌊 Área | Tendencias con volumen |
| 🥧 Pastel | Proporciones de un total |
| 🍩 Dona | Proporciones con centro libre |
| 🕸️ Radar | Comparar múltiples variables |
| ❄️ Área Polar | Datos cíclicos |
| ⚪ Dispersión | Correlaciones X vs Y |
| 📊📈 Barras + Línea | Comparar barras con tendencia |

---

## 📁 Estructura MVC

```
src/
├── types/           # Tipos TypeScript
├── models/          # DataModel (Excel), ChartModel (config)
├── views/           # UploadView, ChartView
├── controllers/     # AppController
├── tests/           # Vitest
└── main.ts          # Entry point
```

---

## 📝 Licencia

[MIT](LICENSE) © Pablo Machado

---
