import { describe, it, expect } from 'vitest';
import { prepareChartData, defaultChartConfig, chartTypeLabels, colorSchemes } from '../models/ChartModel';
import { ChartConfig, ParsedData } from '../types';

describe('defaultChartConfig', () => {
  it('returns default bar chart config', () => {
    const config = defaultChartConfig();
    expect(config.type).toBe('bar');
    expect(config.title).toBe('Mi Gráfica');
    expect(config.yLineColumn).toBe('');
    expect(config.showTitle).toBe(true);
    expect(config.showData).toBe(true);
    expect(config.colorScheme).toBeDefined();
  });
});

describe('chartTypeLabels', () => {
  it('has labels for all chart types', () => {
    expect(chartTypeLabels.bar).toBe('Barras Verticales');
    expect(chartTypeLabels.horizontalBar).toBe('Barras Horizontales');
    expect(chartTypeLabels.line).toBe('Líneas');
    expect(chartTypeLabels.area).toBe('Área');
    expect(chartTypeLabels.pie).toBe('Pastel');
    expect(chartTypeLabels.mixed).toBe('Barras + Línea');
  });
});

describe('colorSchemes', () => {
  it('has at least 5 schemes', () => {
    const schemes = Object.keys(colorSchemes);
    expect(schemes.length).toBeGreaterThanOrEqual(5);
  });

  it('each scheme has colors', () => {
    Object.values(colorSchemes).forEach((scheme) => {
      expect(scheme.length).toBeGreaterThan(0);
    });
  });
});

describe('prepareChartData', () => {
  const mockData: ParsedData = {
    headers: ['month', 'sales'],
    rows: [
      { month: 'Ene', sales: 100 },
      { month: 'Feb', sales: 150 },
      { month: 'Mar', sales: 200 },
    ],
    columns: [
      { name: 'month', type: 'string', values: ['Ene', 'Feb', 'Mar'] },
      { name: 'sales', type: 'number', values: [100, 150, 200] },
    ],
  };

  it('prepares labels and dataset correctly', () => {
    const config: ChartConfig = {
      type: 'bar',
      xColumn: 'month',
      yColumn: 'sales',
      yLineColumn: '',
      title: 'Ventas',
      colorScheme: colorSchemes.default,
      showTitle: true,
      showData: true,
      showLabels: false,
      showXLabels: true,
      chartTheme: 'dark',
    };

    const result = prepareChartData(mockData, config);
    expect(result.labels).toEqual(['Ene', 'Feb', 'Mar']);
    expect(result.datasets[0].data).toEqual([100, 150, 200]);
    expect(result.datasets[0].label).toBe('sales');
  });

  it('handles null values as zero', () => {
    const dataWithNull: ParsedData = {
      headers: ['month', 'sales'],
      rows: [
        { month: 'Ene', sales: null },
        { month: 'Feb', sales: 150 },
      ],
      columns: [
        { name: 'month', type: 'string', values: ['Ene', 'Feb'] },
        { name: 'sales', type: 'number', values: [null, 150] },
      ],
    };

    const config: ChartConfig = {
      type: 'bar',
      xColumn: 'month',
      yColumn: 'sales',
      yLineColumn: '',
      title: 'Ventas',
      colorScheme: colorSchemes.default,
      showTitle: true,
      showData: true,
      showLabels: false,
      showXLabels: true,
      chartTheme: 'dark',
    };

    const result = prepareChartData(dataWithNull, config);
    expect(result.datasets[0].data).toEqual([0, 150]);
  });

  it('creates mixed chart with bar and line datasets', () => {
    const mockData: ParsedData = {
      headers: ['month', 'sales', 'target'],
      rows: [
        { month: 'Ene', sales: 100, target: 120 },
        { month: 'Feb', sales: 150, target: 140 },
        { month: 'Mar', sales: 200, target: 180 },
      ],
      columns: [
        { name: 'month', type: 'string', values: ['Ene', 'Feb', 'Mar'] },
        { name: 'sales', type: 'number', values: [100, 150, 200] },
        { name: 'target', type: 'number', values: [120, 140, 180] },
      ],
    };

    const config: ChartConfig = {
      type: 'mixed',
      xColumn: 'month',
      yColumn: 'sales',
      yLineColumn: 'target',
      title: 'Ventas vs Meta',
      colorScheme: colorSchemes.default,
      showTitle: true,
      showData: true,
      showLabels: false,
      showXLabels: true,
      chartTheme: 'dark',
    };

    const result = prepareChartData(mockData, config);
    expect(result.datasets).toHaveLength(2);
    expect(result.datasets[0].data).toEqual([100, 150, 200]);
    expect(result.datasets[1].type).toBe('line');
    expect(result.datasets[1].data).toEqual([120, 140, 180]);
    expect(result.datasets[1].borderWidth).toBe(4);
    expect(result.datasets[1].tension).toBe(0.3);
  });

  it('creates area chart with fill and tension', () => {
    const config: ChartConfig = {
      type: 'area',
      xColumn: 'month',
      yColumn: 'sales',
      yLineColumn: '',
      title: 'Ventas',
      colorScheme: colorSchemes.default,
      showTitle: true,
      showData: true,
      showLabels: false,
      showXLabels: true,
      chartTheme: 'dark',
    };

    const result = prepareChartData(mockData, config);
    expect(result.datasets[0].type).toBe('line');
    expect(result.datasets[0].fill).toBe(true);
    expect(result.datasets[0].tension).toBe(0.4);
  });

  it('creates horizontal bar chart with indexAxis y', () => {
    const config: ChartConfig = {
      type: 'horizontalBar',
      xColumn: 'month',
      yColumn: 'sales',
      yLineColumn: '',
      title: 'Ventas',
      colorScheme: colorSchemes.default,
      showTitle: true,
      showData: true,
      showLabels: false,
      showXLabels: true,
      chartTheme: 'dark',
    };

    const result = prepareChartData(mockData, config);
    expect(result.datasets[0].data).toEqual([100, 150, 200]);
  });
});
