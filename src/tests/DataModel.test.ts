import { describe, it, expect } from 'vitest';
import { inferType, getNumericColumns, getStringColumns } from '../models/DataModel';
import { ParsedData } from '../types';

describe('inferType', () => {
  it('should return number when most values are numeric', () => {
    const values = [1, 2, 3, '4', '5'];
    expect(inferType(values)).toBe('number');
  });

  it('should return string when most values are text', () => {
    const values = ['a', 'b', 'c', '1'];
    expect(inferType(values)).toBe('string');
  });

  it('should return string for empty arrays', () => {
    expect(inferType([])).toBe('string');
  });

  it('should return string for all null values', () => {
    expect(inferType([null, null, ''])).toBe('string');
  });
});

describe('column filters', () => {
  const mockData: ParsedData = {
    headers: ['name', 'age', 'city'],
    rows: [
      { name: 'Ana', age: 25, city: 'Madrid' },
      { name: 'Luis', age: 30, city: 'Barcelona' },
    ],
    columns: [
      { name: 'name', type: 'string', values: ['Ana', 'Luis'] },
      { name: 'age', type: 'number', values: [25, 30] },
      { name: 'city', type: 'string', values: ['Madrid', 'Barcelona'] },
    ],
  };

  it('getNumericColumns returns only numeric columns', () => {
    const result = getNumericColumns(mockData);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('age');
  });

  it('getStringColumns returns only string columns', () => {
    const result = getStringColumns(mockData);
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.name)).toContain('name');
    expect(result.map((c) => c.name)).toContain('city');
  });
});
