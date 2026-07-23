// Core data processing, statistical computing, wrangling & analytics utilities

// Detect data type for each column
export function getColumnTypes(data) {
  if (!data || data.length === 0) return {};
  const columns = Object.keys(data[0]);
  const types = {};

  columns.forEach(col => {
    let numericCount = 0;
    let dateCount = 0;
    let booleanCount = 0;
    let validCount = 0;

    for (let i = 0; i < Math.min(data.length, 200); i++) {
      const val = data[i][col];
      if (val === null || val === undefined || val === '') continue;
      validCount++;

      if (typeof val === 'number' || (!isNaN(val) && !isNaN(parseFloat(val)))) {
        numericCount++;
      } else if (typeof val === 'boolean' || val === 'true' || val === 'false') {
        booleanCount++;
      } else if (!isNaN(Date.parse(val)) && typeof val === 'string' && val.length > 5) {
        dateCount++;
      }
    }

    if (validCount === 0) {
      types[col] = 'string';
    } else if (numericCount / validCount > 0.8) {
      types[col] = 'numeric';
    } else if (dateCount / validCount > 0.7) {
      types[col] = 'date';
    } else if (booleanCount / validCount > 0.8) {
      types[col] = 'boolean';
    } else {
      types[col] = 'string';
    }
  });

  return types;
}

// Compute comprehensive statistics for numeric columns
export function computeColumnStats(data, column) {
  const values = data
    .map(row => parseFloat(row[column]))
    .filter(val => !isNaN(val) && val !== null && val !== undefined)
    .sort((a, b) => a - b);

  const totalRows = data.length;
  const validCount = values.length;
  const missingCount = totalRows - validCount;

  if (validCount === 0) {
    return { count: 0, validCount: 0, missingCount, mean: 0, median: 0, min: 0, max: 0, stdDev: 0, q1: 0, q3: 0, iqr: 0, skewness: 0 };
  }

  const sum = values.reduce((acc, v) => acc + v, 0);
  const mean = sum / validCount;

  const median = validCount % 2 === 0
    ? (values[validCount / 2 - 1] + values[validCount / 2]) / 2
    : values[Math.floor(validCount / 2)];

  const q1 = values[Math.floor(validCount * 0.25)] || values[0];
  const q3 = values[Math.floor(validCount * 0.75)] || values[values.length - 1];
  const iqr = q3 - q1;

  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / validCount;
  const stdDev = Math.sqrt(variance);

  // Skewness calculation (Fisher-Pearson coefficient)
  const m3 = values.reduce((acc, v) => acc + Math.pow(v - mean, 3), 0) / validCount;
  const skewness = stdDev !== 0 ? m3 / Math.pow(stdDev, 3) : 0;

  return {
    count: totalRows,
    validCount,
    missingCount,
    mean: Number(mean.toFixed(3)),
    median: Number(median.toFixed(3)),
    min: values[0],
    max: values[values.length - 1],
    sum: Number(sum.toFixed(3)),
    stdDev: Number(stdDev.toFixed(3)),
    q1,
    q3,
    iqr: Number(iqr.toFixed(3)),
    skewness: Number(skewness.toFixed(3))
  };
}

// Compute Pearson Correlation Matrix for numeric columns
export function computeCorrelationMatrix(data, numericColumns) {
  const matrix = {};
  numericColumns.forEach(col1 => {
    matrix[col1] = {};
    numericColumns.forEach(col2 => {
      if (col1 === col2) {
        matrix[col1][col2] = 1.0;
        return;
      }

      const pairs = data
        .map(row => [parseFloat(row[col1]), parseFloat(row[col2])])
        .filter(([v1, v2]) => !isNaN(v1) && !isNaN(v2));

      if (pairs.length < 2) {
        matrix[col1][col2] = 0;
        return;
      }

      const n = pairs.length;
      const sum1 = pairs.reduce((a, p) => a + p[0], 0);
      const sum2 = pairs.reduce((a, p) => a + p[1], 0);
      const sum1Sq = pairs.reduce((a, p) => a + p[0] * p[0], 0);
      const sum2Sq = pairs.reduce((a, p) => a + p[1] * p[1], 0);
      const pSum = pairs.reduce((a, p) => a + p[0] * p[1], 0);

      const num = pSum - (sum1 * sum2 / n);
      const den = Math.sqrt((sum1Sq - (sum1 * sum1) / n) * (sum2Sq - (sum2 * sum2) / n));

      const corr = den === 0 ? 0 : num / den;
      matrix[col1][col2] = Number(corr.toFixed(3));
    });
  });

  return matrix;
}

// Compute Linear Regression trendline (y = mx + c)
export function computeLinearRegression(data, xCol, yCol) {
  const points = data
    .map(row => [parseFloat(row[xCol]), parseFloat(row[yCol])])
    .filter(([x, y]) => !isNaN(x) && !isNaN(y));

  if (points.length < 2) return { m: 0, c: 0, rSquared: 0, points: [] };

  const n = points.length;
  const sumX = points.reduce((acc, p) => acc + p[0], 0);
  const sumY = points.reduce((acc, p) => acc + p[1], 0);
  const sumXY = points.reduce((acc, p) => acc + p[0] * p[1], 0);
  const sumXX = points.reduce((acc, p) => acc + p[0] * p[0], 0);

  const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const c = (sumY - m * sumX) / n;

  // R-squared
  const yMean = sumY / n;
  const ssTot = points.reduce((acc, p) => acc + Math.pow(p[1] - yMean, 2), 0);
  const ssRes = points.reduce((acc, p) => acc + Math.pow(p[1] - (m * p[0] + c), 2), 0);
  const rSquared = ssTot === 0 ? 1 : 1 - (ssRes / ssTot);

  return {
    m: Number(m.toFixed(4)),
    c: Number(c.toFixed(4)),
    rSquared: Number(rSquared.toFixed(4)),
    points
  };
}

// Data wrangling - handle missing values
export function handleMissingValues(data, column, strategy, customVal = '') {
  if (!data) return [];
  const stats = computeColumnStats(data, column);
  const fillVal = strategy === 'mean' ? stats.mean
    : strategy === 'median' ? stats.median
    : strategy === 'zero' ? 0
    : customVal;

  if (strategy === 'drop') {
    return data.filter(row => row[column] !== null && row[column] !== undefined && row[column] !== '');
  }

  return data.map(row => {
    const v = row[column];
    if (v === null || v === undefined || v === '') {
      return { ...row, [column]: fillVal };
    }
    return row;
  });
}

// Data wrangling - detect and filter outliers using IQR method
export function detectOutliersIQR(data, column) {
  const stats = computeColumnStats(data, column);
  const lowerBound = stats.q1 - 1.5 * stats.iqr;
  const upperBound = stats.q3 + 1.5 * stats.iqr;

  const outliers = [];
  const cleanData = [];

  data.forEach((row, idx) => {
    const val = parseFloat(row[column]);
    if (!isNaN(val) && (val < lowerBound || val > upperBound)) {
      outliers.push({ index: idx, row, val, lowerBound, upperBound });
    } else {
      cleanData.push(row);
    }
  });

  return { cleanData, outliers, lowerBound, upperBound };
}

// Dynamic grouping & aggregation engine for charts
export function groupAndAggregate(data, xCol, yCol, aggMethod = 'sum') {
  if (!data || data.length === 0 || !xCol) return [];

  const groups = {};

  data.forEach(row => {
    const key = String(row[xCol] ?? 'N/A');
    const val = parseFloat(row[yCol]) || 0;

    if (!groups[key]) {
      groups[key] = { count: 0, sum: 0, min: val, max: val, values: [] };
    }

    groups[key].count += 1;
    groups[key].sum += val;
    groups[key].min = Math.min(groups[key].min, val);
    groups[key].max = Math.max(groups[key].max, val);
    groups[key].values.push(val);
  });

  return Object.keys(groups).map(key => {
    const g = groups[key];
    let resultVal = 0;

    if (aggMethod === 'sum') resultVal = g.sum;
    else if (aggMethod === 'avg' || aggMethod === 'mean') resultVal = g.sum / (g.count || 1);
    else if (aggMethod === 'count') resultVal = g.count;
    else if (aggMethod === 'min') resultVal = g.min;
    else if (aggMethod === 'max') resultVal = g.max;

    return {
      name: key,
      value: Number(resultVal.toFixed(2)),
      count: g.count
    };
  });
}

// Pivot Table Generator
export function generatePivotTable(data, rowCol, colCol, valCol, aggFunc = 'sum') {
  if (!data || !rowCol || !colCol || !valCol) return { rows: [], cols: [], matrix: {} };

  const uniqueRows = Array.from(new Set(data.map(r => String(r[rowCol] ?? 'N/A')))).sort();
  const uniqueCols = Array.from(new Set(data.map(r => String(r[colCol] ?? 'N/A')))).sort();

  const matrix = {};
  uniqueRows.forEach(r => {
    matrix[r] = {};
    uniqueCols.forEach(c => {
      matrix[r][c] = { sum: 0, count: 0, min: Infinity, max: -Infinity, values: [] };
    });
  });

  data.forEach(item => {
    const rKey = String(item[rowCol] ?? 'N/A');
    const cKey = String(item[colCol] ?? 'N/A');
    const val = parseFloat(item[valCol]) || 0;

    if (matrix[rKey] && matrix[rKey][cKey]) {
      const cell = matrix[rKey][cKey];
      cell.sum += val;
      cell.count += 1;
      cell.min = Math.min(cell.min, val);
      cell.max = Math.max(cell.max, val);
      cell.values.push(val);
    }
  });

  // Calculate final aggregated matrix values
  const formattedMatrix = {};
  uniqueRows.forEach(r => {
    formattedMatrix[r] = {};
    uniqueCols.forEach(c => {
      const cell = matrix[r][c];
      let val = 0;
      if (cell.count > 0) {
        if (aggFunc === 'sum') val = cell.sum;
        else if (aggFunc === 'avg') val = cell.sum / cell.count;
        else if (aggFunc === 'count') val = cell.count;
        else if (aggFunc === 'min') val = cell.min;
        else if (aggFunc === 'max') val = cell.max;
      }
      formattedMatrix[r][c] = Number(val.toFixed(2));
    });
  });

  return {
    rowKey: rowCol,
    colKey: colCol,
    valKey: valCol,
    rows: uniqueRows,
    cols: uniqueCols,
    matrix: formattedMatrix
  };
}
