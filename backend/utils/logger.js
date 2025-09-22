const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/aiAnalysis.log");

const logAnalysis = (userId, fileName, result) => {
    const logEntry = `[${new Date().toISOString()}] User: ${userId}, File: ${fileName}, AI Result: ${result.slice(0, 100)}...\n`;
    fs.appendFileSync(logFilePath, logEntry, "utf8");
};

module.exports = { logAnalysis };
