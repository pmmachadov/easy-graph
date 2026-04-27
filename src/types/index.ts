export interface DataRow {
  [key: string]: string | number | null;
}

export interface ColumnInfo {
  name: string;
  type: 'number' | 'string' | 'date';
  values: (string | number | null)[];
}

export type ChartType =
  | 'bar'
  | 'horizontalBar'
  | 'line'
  | 'area'
  | 'pie'
  | 'doughnut'
  | 'radar'
  | 'polarArea'
  | 'scatter'
  | 'mixed';

export type ChartTheme = 'dark' | 'light';

export interface ChartConfig {
  type: ChartType;
  xColumn: string;
  yColumn: string;
  yLineColumn: string;
  title: string;
  colorScheme: string[];
  showTitle: boolean;
  showData: boolean;
  showLabels: boolean;
  showXLabels: boolean;
  chartTheme: ChartTheme;
}

export interface ParsedData {
  headers: string[];
  rows: DataRow[];
  columns: ColumnInfo[];
}
