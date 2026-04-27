import type { ParsedData, DataRow, ColumnInfo } from '../types';

export const inferType = (values: (string | number | null)[]): ColumnInfo['type'] => {
  const nonNull = values.filter((v) => v !== null && v !== '');
  if (nonNull.length === 0) return 'string';

  const numericCount = nonNull.filter((v) => typeof v === 'number' || (!isNaN(Number(v)) && v !== '')).length;
  return numericCount / nonNull.length > 0.8 ? 'number' : 'string';
};

export const parseFile = async (file: File): Promise<ParsedData> => {
  const XLSX = await import('xlsx');
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (string | number | null)[][];

  if (jsonData.length === 0) {
    throw new Error('El archivo está vacío');
  }

  const headers = (jsonData[0] || []).map((h) => String(h).trim());
  const rows: DataRow[] = [];

  for (let i = 1; i < jsonData.length; i++) {
    const row: DataRow = {};
    headers.forEach((header, index) => {
      const raw = jsonData[i][index];
      row[header] = raw === undefined ? null : raw;
    });
    rows.push(row);
  }

  const columns: ColumnInfo[] = headers.map((header) => {
    const values = rows.map((r) => r[header]);
    return {
      name: header,
      type: inferType(values),
      values,
    };
  });

  return { headers, rows, columns };
};

export const getNumericColumns = (data: ParsedData): ColumnInfo[] =>
  data.columns.filter((c) => c.type === 'number');

export const getStringColumns = (data: ParsedData): ColumnInfo[] =>
  data.columns.filter((c) => c.type === 'string');
