import * as fs from 'fs';

// Reads a JSON file and parses its content into a JavaScript object
export function readJsonFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

// Retrieves specific test data by test case name from a JSON file
export function getTestData(filePath: string, testCaseName: string) {
  const testData = readJsonFile(filePath);
  return testData[testCaseName];
}
