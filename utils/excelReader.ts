import * as XLSX from 'xlsx';

export function getExcelData(filePath: string) {

 const workbook = XLSX.readFile(filePath);

 const sheetName = workbook.SheetNames[0];

 const sheet = workbook.Sheets[sheetName];

 const rawData: any = XLSX.utils.sheet_to_json(sheet);

 // Normalize keys
 const data = rawData.map((row:any) => ({
  username: row.username || row.Username || row.USERNAME,
  password: row.password || row.Password || row.PASSWORD
 }));

 return data;
}