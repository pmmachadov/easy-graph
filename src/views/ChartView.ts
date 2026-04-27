import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import type { ChartConfig, ParsedData } from '../types';
import { prepareChartData, chartTypeLabels, colorSchemes } from '../models/ChartModel';

Chart.register(...registerables, ChartDataLabels);

const customCanvasBackgroundColor = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart: any, args: any, options: any) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    ctx.save();
    ctx.fillStyle = options.color || 'transparent';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

Chart.register(customCanvasBackgroundColor);

export const createChartView = (container: HTMLElement) => {
  container.innerHTML = `
    <div class="chart-workspace">
      <aside class="sidebar">
        <h3>Configuración</h3>
        <div class="field">
          <label>Título</label>
          <input type="text" id="chart-title" value="Mi Gráfica" />
        </div>
        <div class="field">
          <label>Tipo de gráfica</label>
          <select id="chart-type">
            ${Object.entries(chartTypeLabels).map(([key, label]) => `<option value="${key}">${label}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label>Eje X (categorías)</label>
          <select id="x-column"></select>
        </div>
        <div class="field">
          <label>Eje Y (valores)</label>
          <select id="y-column"></select>
        </div>
        <div class="field" id="line-field" style="display:none">
          <label>Línea (valores)</label>
          <select id="y-line-column"></select>
        </div>
        <div class="field">
          <label>Paleta de colores</label>
          <select id="color-scheme">
            <option value="berry">Berry</option>
            <option value="coral">Coral</option>
            <option value="default">Por defecto</option>
            <option value="earth">Tierra</option>
            <option value="executive">Ejecutivo</option>
            <option value="google">Google</option>
            <option value="googlePastel">Google Pastel</option>
            <option value="googleVivid">Google Vivo</option>
            <option value="midnight">Medianoche</option>
            <option value="ocean">Océano</option>
            <option value="pastel">Pastel</option>
            <option value="royal">Real</option>
            <option value="slate">Pizarra</option>
            <option value="threeD">3D</option>
            <option value="wine">Vino</option>
          </select>
        </div>
        <div class="field checkbox-field">
          <label class="checkbox-label">
            <input type="checkbox" id="show-title" checked />
            <span>Mostrar título</span>
          </label>
        </div>
        <div class="field checkbox-field">
          <label class="checkbox-label">
            <input type="checkbox" id="show-data" checked />
            <span>Mostrar datos</span>
          </label>
        </div>
        <div class="field checkbox-field">
          <label class="checkbox-label">
            <input type="checkbox" id="show-labels" />
            <span>Mostrar valores en barras</span>
          </label>
        </div>
        <div class="field checkbox-field">
          <label class="checkbox-label">
            <input type="checkbox" id="show-x-labels" checked />
            <span>Mostrar etiquetas eje X</span>
          </label>
        </div>
        <div class="field checkbox-field">
          <label class="checkbox-label">
            <input type="checkbox" id="chart-theme" />
            <span>🌞 Modo claro (gráfica)</span>
          </label>
        </div>
        <button class="btn-primary" id="btn-update">Actualizar gráfica</button>
        <button class="btn-primary" id="btn-download">📥 Descargar JPG</button>
        <button class="btn-secondary" id="btn-new-file">Subir otro archivo</button>
      </aside>
      <main class="chart-area">
        <div class="chart-container" id="chart-container">
          <canvas id="chart-canvas"></canvas>
        </div>
        <div class="data-preview" id="data-preview"></div>
      </main>
    </div>
  `;

  const titleInput = container.querySelector('#chart-title') as HTMLInputElement;
  const typeSelect = container.querySelector('#chart-type') as HTMLSelectElement;
  const xSelect = container.querySelector('#x-column') as HTMLSelectElement;
  const ySelect = container.querySelector('#y-column') as HTMLSelectElement;
  const yLineSelect = container.querySelector('#y-line-column') as HTMLSelectElement;
  const lineField = container.querySelector('#line-field') as HTMLElement;
  const colorSelect = container.querySelector('#color-scheme') as HTMLSelectElement;
  const showTitleCheck = container.querySelector('#show-title') as HTMLInputElement;
  const showDataCheck = container.querySelector('#show-data') as HTMLInputElement;
  const showLabelsCheck = container.querySelector('#show-labels') as HTMLInputElement;
  const showXLabelsCheck = container.querySelector('#show-x-labels') as HTMLInputElement;
  const chartThemeCheck = container.querySelector('#chart-theme') as HTMLInputElement;
  const btnUpdate = container.querySelector('#btn-update') as HTMLButtonElement;
  const btnDownload = container.querySelector('#btn-download') as HTMLButtonElement;
  const btnNewFile = container.querySelector('#btn-new-file') as HTMLButtonElement;
  const canvas = container.querySelector('#chart-canvas') as HTMLCanvasElement;
  const chartContainer = container.querySelector('#chart-container') as HTMLElement;
  const preview = container.querySelector('#data-preview') as HTMLElement;

  let chartInstance: Chart | null = null;

  const populateColumns = (headers: string[], numericColumns: string[]) => {
    xSelect.innerHTML = headers.map((h) => `<option value="${h}">${h}</option>`).join('');
    ySelect.innerHTML = numericColumns.map((h) => `<option value="${h}">${h}</option>`).join('');
    yLineSelect.innerHTML = numericColumns.map((h) => `<option value="${h}">${h}</option>`).join('');
    if (headers.length > 0) xSelect.value = headers[0];
    if (numericColumns.length > 0) {
      ySelect.value = numericColumns[0];
      yLineSelect.value = numericColumns[1] || numericColumns[0];
    }
  };

  const getThemeColors = (theme: ChartConfig['chartTheme']) =>
    theme === 'light'
      ? {
          text: '#1e293b',
          grid: 'rgba(0, 0, 0, 0.08)',
          tooltipBg: 'rgba(30, 41, 59, 0.9)',
          containerBg: '#ffffff',
          labelColor: '#1e293b',
        }
      : {
          text: '#f1f5f9',
          grid: 'rgba(148, 163, 184, 0.1)',
          tooltipBg: 'rgba(44, 62, 80, 0.9)',
          containerBg: '#0a0a0a',
          labelColor: '#f1f5f9',
        };

  const renderChart = (data: ParsedData, config: ChartConfig) => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chartData = prepareChartData(data, config);
    const chartType =
      config.type === 'mixed' || config.type === 'horizontalBar'
        ? 'bar'
        : config.type === 'area'
        ? 'line'
        : config.type;

    const t = getThemeColors(config.chartTheme);
    chartContainer.style.background = t.containerBg;

    chartInstance = new Chart(ctx, {
      type: chartType as any,
      data: chartData,
      options: {
        indexAxis: config.type === 'horizontalBar' ? ('y' as const) : undefined,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          customCanvasBackgroundColor: {
            color: config.chartTheme === 'light' ? '#ffffff' : 'transparent',
          },
          datalabels: {
            display: config.showLabels,
            color: t.labelColor,
            font: { weight: 'bold', size: 12 },
            anchor: 'end',
            align: 'top',
            offset: 4,
            formatter: (value: any) => {
              if (typeof value === 'object' && value !== null) {
                return value.y ?? value;
              }
              return value;
            },
          },
          title: {
            display: config.showTitle,
            text: config.title,
            font: { size: 18, weight: 'bold' },
            color: t.text,
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: { size: 12 },
              color: t.text,
            },
          },
          tooltip: {
            backgroundColor: t.tooltipBg,
            titleFont: { size: 14 },
            bodyFont: { size: 13 },
            padding: 12,
            cornerRadius: 8,
          },
        },
        scales:
          chartType === 'pie' || chartType === 'doughnut' || chartType === 'polarArea' || chartType === 'radar'
            ? {}
            : chartType === 'scatter'
            ? {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  ticks: { display: config.showXLabels, color: t.text, font: { size: 12 } },
                  grid: { color: t.grid },
                },
                y: {
                  type: 'linear',
                  ticks: { color: t.text, font: { size: 12 } },
                  grid: { color: t.grid },
                  beginAtZero: true,
                },
              }
            : {
                x: {
                  ticks: { display: config.showXLabels, color: t.text, font: { size: 12 } },
                  grid: { color: t.grid },
                },
                y: {
                  ticks: { color: t.text, font: { size: 12 } },
                  grid: { color: t.grid },
                  beginAtZero: true,
                },
              },
        animation: {
          duration: 800,
          easing: 'easeOutQuart',
        },
      },
    });
  };

  const renderPreview = (data: ParsedData) => {
    const maxRows = 10;
    const rows = data.rows.slice(0, maxRows);
    preview.innerHTML = `
      <h4>Vista previa de datos (${data.rows.length} filas)</h4>
      <div class="table-wrapper">
        <table>
          <thead><tr>${data.headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>
            ${rows.map((row) => `<tr>${data.headers.map((h) => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  const downloadChart = () => {
    if (!chartInstance) return;
    const link = document.createElement('a');
    link.download = `${titleInput.value || 'grafica'}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  return {
    element: container,
    populateColumns,
    renderChart,
    renderPreview,
    getConfig: (): ChartConfig => ({
      type: typeSelect.value as ChartConfig['type'],
      xColumn: xSelect.value,
      yColumn: ySelect.value,
      yLineColumn: yLineSelect.value,
      title: titleInput.value,
      colorScheme: colorSchemes[colorSelect.value] || colorSchemes.default,
      showTitle: showTitleCheck.checked,
      showData: showDataCheck.checked,
      showLabels: showLabelsCheck.checked,
      showXLabels: showXLabelsCheck.checked,
      chartTheme: chartThemeCheck.checked ? 'light' : 'dark',
    }),
    toggleShowData: () => {
      preview.style.display = showDataCheck.checked ? 'block' : 'none';
    },
    toggleLineField: () => {
      const isMixed = typeSelect.value === 'mixed';
      lineField.style.display = isMixed ? 'block' : 'none';
    },
    onUpdate: (callback: () => void) => {
      btnUpdate.addEventListener('click', callback);
      btnDownload.addEventListener('click', downloadChart);

      const autoUpdateInputs = [typeSelect, xSelect, ySelect, yLineSelect, colorSelect, showTitleCheck, showDataCheck, showLabelsCheck, showXLabelsCheck, chartThemeCheck];
      autoUpdateInputs.forEach((el) => {
        el.addEventListener('change', () => {
          if (el === typeSelect) {
            lineField.style.display = typeSelect.value === 'mixed' ? 'block' : 'none';
          }
          if (el === showDataCheck) {
            preview.style.display = showDataCheck.checked ? 'block' : 'none';
          }
          callback();
        });
      });

      titleInput.addEventListener('input', () => {
        callback();
      });
    },
    onNewFile: (callback: () => void) => {
      btnNewFile.addEventListener('click', callback);
    },
  };
};
