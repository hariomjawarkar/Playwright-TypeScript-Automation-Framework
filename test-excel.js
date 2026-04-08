const { getExcelData } = require('./utils/excelReader');
const path = require('path');
try {
  const data = getExcelData(path.resolve(__dirname, 'test-data/loginData.xlsx'));
  console.log('Successfully read data:', data);
} catch (e) {
  console.error('Failed to read excel:', e);
}
