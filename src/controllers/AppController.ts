import type { ParsedData, ChartConfig } from '../types';
import { parseFile } from '../models/DataModel';
import { defaultChartConfig } from '../models/ChartModel';
import { createUploadView } from '../views/UploadView';
import { createChartView } from '../views/ChartView';

export const createAppController = (container: HTMLElement) => {
  let currentData: ParsedData | null = null;

  const showUpload = () => {
    container.innerHTML = '';
    const uploadView = createUploadView(container);

    uploadView.onFileSelect(async (file) => {
      uploadView.showLoading();
      try {
        const data = await parseFile(file);
        currentData = data;
        showChart(data);
      } catch (err) {
        uploadView.showError((err as Error).message);
      }
    });
  };

  const showChart = (data: ParsedData) => {
    container.innerHTML = '';
    const chartView = createChartView(container);

    const numericCols = data.columns.filter((c) => c.type === 'number').map((c) => c.name);
    const allCols = data.headers;

    chartView.populateColumns(allCols, numericCols);
    chartView.renderPreview(data);

    const initialConfig: ChartConfig = {
      ...defaultChartConfig(),
      xColumn: allCols[0] || '',
      yColumn: numericCols[0] || '',
      yLineColumn: numericCols[1] || numericCols[0] || '',
      showTitle: true,
      showData: true,
      showLabels: false,
      showXLabels: true,
      chartTheme: 'dark',
    };
    chartView.renderChart(data, initialConfig);
    chartView.renderPreview(data);
    chartView.toggleLineField();
    chartView.toggleShowData();

    chartView.onUpdate(() => {
      if (!currentData) return;
      const config = chartView.getConfig();
      chartView.renderChart(currentData, config);
    });

    chartView.onNewFile(() => {
      currentData = null;
      showUpload();
    });
  };

  return {
    init: () => {
      showUpload();
    },
  };
};
