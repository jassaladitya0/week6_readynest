import alasql from 'alasql';

// Execute SQL query over loaded JSON array dataset
export function executeSqlQuery(data, queryStr, tableName = 'dataset') {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { success: false, error: 'Dataset is empty or invalid.' };
  }

  const startTime = performance.now();

  try {
    // Register temporary table in AlaSQL
    alasql.tables = {}; // Reset tables
    alasql(`CREATE TABLE ${tableName}`);
    alasql.tables[tableName].data = [...data];

    const result = alasql(queryStr);
    const executionTimeMs = Number((performance.now() - startTime).toFixed(2));

    if (!Array.isArray(result)) {
      return {
        success: true,
        data: [{ result: String(result) }],
        columns: ['result'],
        rowCount: 1,
        executionTimeMs
      };
    }

    const columns = result.length > 0 ? Object.keys(result[0]) : [];

    return {
      success: true,
      data: result,
      columns,
      rowCount: result.length,
      executionTimeMs
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Error executing SQL query.'
    };
  }
}

// Built-in SQL snippet recommendations
export const QUICK_SQL_TEMPLATES = [
  { name: 'Select All', query: 'SELECT * FROM dataset LIMIT 20' },
  { name: 'Group By & Aggregation', query: 'SELECT Region, COUNT(*) as Orders, SUM(Sales) as TotalSales, AVG(Profit) as AvgProfit FROM dataset GROUP BY Region ORDER BY TotalSales DESC' },
  { name: 'Top 5 High Performers', query: 'SELECT * FROM dataset ORDER BY Sales DESC LIMIT 5' },
  { name: 'Filter & Conditional', query: 'SELECT * FROM dataset WHERE Profit > 100 AND Rating >= 4.5' },
  { name: 'Summary Counts by Category', query: 'SELECT Category, SubCategory, COUNT(*) as Items FROM dataset GROUP BY Category, SubCategory' }
];
