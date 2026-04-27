import type { ChartConfig, ChartType, ParsedData } from '../types';

export const colorSchemes: Record<string, string[]> = {
  berry: [
    'rgba(142, 36, 170, 0.7)',
    'rgba(225, 29, 96, 0.7)',
    'rgba(255, 64, 129, 0.7)',
    'rgba(124, 77, 255, 0.7)',
    'rgba(48, 63, 159, 0.7)',
    'rgba(197, 17, 98, 0.7)',
  ],
  coral: [
    'rgba(255, 127, 80, 0.7)',
    'rgba(64, 224, 208, 0.7)',
    'rgba(255, 99, 71, 0.7)',
    'rgba(72, 209, 204, 0.7)',
    'rgba(240, 128, 128, 0.7)',
    'rgba(32, 178, 170, 0.7)',
  ],
  default: [
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 99, 132, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(199, 199, 199, 0.7)',
    'rgba(83, 102, 255, 0.7)',
  ],
  earth: [
    'rgba(141, 110, 99, 0.7)',
    'rgba(161, 136, 127, 0.7)',
    'rgba(188, 170, 164, 0.7)',
    'rgba(215, 204, 200, 0.7)',
    'rgba(121, 85, 72, 0.7)',
    'rgba(109, 76, 65, 0.7)',
    'rgba(78, 52, 46, 0.7)',
  ],
  executive: [
    'rgba(30, 58, 138, 0.8)',
    'rgba(59, 130, 246, 0.8)',
    'rgba(107, 114, 128, 0.8)',
    'rgba(203, 213, 225, 0.8)',
    'rgba(15, 23, 42, 0.8)',
    'rgba(99, 102, 241, 0.8)',
    'rgba(148, 163, 184, 0.8)',
  ],
  google: [
    'rgba(66, 133, 244, 0.7)',
    'rgba(219, 68, 55, 0.7)',
    'rgba(244, 160, 0, 0.7)',
    'rgba(15, 157, 88, 0.7)',
    'rgba(171, 71, 188, 0.7)',
    'rgba(0, 172, 193, 0.7)',
    'rgba(255, 112, 67, 0.7)',
    'rgba(120, 144, 156, 0.7)',
  ],
  googlePastel: [
    'rgba(102, 178, 255, 0.65)',
    'rgba(255, 138, 128, 0.65)',
    'rgba(255, 224, 130, 0.65)',
    'rgba(129, 199, 132, 0.65)',
    'rgba(179, 157, 255, 0.65)',
    'rgba(255, 183, 77, 0.65)',
    'rgba(128, 222, 234, 0.65)',
    'rgba(244, 143, 177, 0.65)',
  ],
  googleVivid: [
    'rgba(66, 133, 244, 0.85)',
    'rgba(234, 67, 53, 0.85)',
    'rgba(251, 188, 5, 0.85)',
    'rgba(52, 168, 83, 0.85)',
    'rgba(147, 52, 230, 0.85)',
    'rgba(245, 124, 0, 0.85)',
    'rgba(36, 193, 224, 0.85)',
    'rgba(233, 30, 99, 0.85)',
  ],
  midnight: [
    'rgba(25, 25, 112, 0.7)',
    'rgba(72, 61, 139, 0.7)',
    'rgba(106, 90, 205, 0.7)',
    'rgba(192, 192, 192, 0.7)',
    'rgba(119, 136, 153, 0.7)',
    'rgba(70, 130, 180, 0.7)',
  ],
  ocean: [
    'rgba(0, 105, 148, 0.7)',
    'rgba(0, 149, 182, 0.7)',
    'rgba(0, 191, 255, 0.7)',
    'rgba(64, 224, 208, 0.7)',
    'rgba(127, 255, 212, 0.7)',
  ],
  pastel: [
    'rgba(255, 179, 186, 0.7)',
    'rgba(255, 223, 186, 0.7)',
    'rgba(255, 255, 186, 0.7)',
    'rgba(186, 255, 201, 0.7)',
    'rgba(186, 225, 255, 0.7)',
  ],
  royal: [
    'rgba(212, 175, 55, 0.7)',
    'rgba(153, 50, 204, 0.7)',
    'rgba(255, 215, 0, 0.7)',
    'rgba(75, 0, 130, 0.7)',
    'rgba(218, 165, 32, 0.7)',
    'rgba(138, 43, 226, 0.7)',
  ],
  slate: [
    'rgba(71, 85, 105, 0.8)',
    'rgba(148, 163, 184, 0.8)',
    'rgba(30, 41, 59, 0.8)',
    'rgba(100, 116, 139, 0.8)',
    'rgba(51, 65, 85, 0.8)',
    'rgba(203, 213, 225, 0.8)',
    'rgba(15, 23, 42, 0.8)',
  ],
  threeD: [
    'rgba(255, 50, 50, 0.85)',
    'rgba(0, 150, 255, 0.85)',
    'rgba(50, 255, 100, 0.85)',
    'rgba(255, 180, 0, 0.85)',
    'rgba(180, 50, 255, 0.85)',
    'rgba(0, 230, 255, 0.85)',
    'rgba(255, 100, 180, 0.85)',
    'rgba(150, 255, 50, 0.85)',
  ],
  wine: [
    'rgba(128, 0, 32, 0.8)',
    'rgba(176, 44, 44, 0.8)',
    'rgba(212, 175, 55, 0.8)',
    'rgba(60, 20, 20, 0.8)',
    'rgba(139, 90, 43, 0.8)',
    'rgba(184, 134, 11, 0.8)',
    'rgba(102, 51, 51, 0.8)',
  ],
};

export const defaultChartConfig = (): ChartConfig => ({
  type: 'bar',
  xColumn: '',
  yColumn: '',
  yLineColumn: '',
  title: 'Mi Gráfica',
  colorScheme: colorSchemes.default,
  showTitle: true,
  showData: true,
  showLabels: false,
  showXLabels: true,
  chartTheme: 'dark',
});

export const prepareChartData = (data: ParsedData, config: ChartConfig) => {
  const labels = data.rows.map((row) => String(row[config.xColumn] ?? ''));
  const values = data.rows.map((row) => {
    const val = row[config.yColumn];
    return val === null || val === '' ? 0 : Number(val);
  });

  const solidBorder = (rgba: string) => rgba.replace(/\d+\.?\d*\)/, '1)');

  const colors = config.colorScheme;
  const backgroundColor = labels.map((_, i) => colors[i % colors.length]);
  const borderColor = backgroundColor.map(solidBorder);

  const isArea = config.type === 'area';
  const isScatter = config.type === 'scatter';
  const isBarLike = config.type === 'bar' || config.type === 'horizontalBar' || config.type === 'mixed';
  const isCircular = config.type === 'pie' || config.type === 'doughnut' || config.type === 'polarArea';

  const datasetBase: any = {
    label: config.yColumn,
    data: isScatter
      ? data.rows.map((row) => ({
          x: Number(row[config.xColumn]) || 0,
          y: Number(row[config.yColumn]) || 0,
        }))
      : values,
    backgroundColor: isArea
      ? backgroundColor.map((c: string) => c.replace(/\d+\.?\d*\)/, '0.25)'))
      : backgroundColor,
    borderColor,
    borderWidth: 3,
  };

  if (isBarLike) {
    datasetBase.borderRadius = 6;
    datasetBase.borderSkipped = false;
  }

  if (isCircular) {
    datasetBase.hoverOffset = 10;
  }

  if (isArea) {
    datasetBase.type = 'line';
    datasetBase.fill = true;
    datasetBase.tension = 0.4;
  }

  const datasets: any[] = [datasetBase];

  if (config.type === 'mixed' && config.yLineColumn) {
    const lineValues = data.rows.map((row) => {
      const val = row[config.yLineColumn];
      return val === null || val === '' ? 0 : Number(val);
    });
    const lineColor = colors[colors.length - 1] || colors[0];
    datasets.push({
      type: 'line',
      label: config.yLineColumn,
      data: lineValues,
      borderColor: solidBorder(lineColor),
      backgroundColor: lineColor,
      borderWidth: 4,
      pointRadius: 5,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 3,
      tension: 0.3,
      order: 1,
    });
  }

  return {
    labels,
    datasets,
  };
};

export const chartTypeLabels: Record<ChartType, string> = {
  bar: 'Barras Verticales',
  horizontalBar: 'Barras Horizontales',
  line: 'Líneas',
  area: 'Área',
  pie: 'Pastel',
  doughnut: 'Dona',
  radar: 'Radar',
  polarArea: 'Área Polar',
  scatter: 'Dispersión',
  mixed: 'Barras + Línea',
};
