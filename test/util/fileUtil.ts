import * as fs from "fs";

export function readJsonFile(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export function getTestData(filePath: string, testCaseName: string) {
    const testData = readJsonFile(filePath);
    return testData[testCaseName];
}