import { client, connectDB } from "@/db";
import logger from "@/logger";
import path from "path";
const ExcelJS = require("exceljs");

let csvFilePath = "./indian_food.csv";
const Process = "Seeding data";
async function seedData() {
  try {
    logger.info(`${Process} started...`);
    
    await connectDB();
    const db = client.db("foodDb");
    const collection = db.collection("dishes");

    const workbook = new ExcelJS.Workbook();
    csvFilePath = path.resolve(__dirname, csvFilePath);
    await workbook.csv.readFile(csvFilePath);
    const worksheet = workbook.worksheets[0];

    const headers = worksheet.getRow(1).values.slice(1);
    const records: any = [];

    worksheet.eachRow((row: any, rowNumber: number) => {
      if (rowNumber > 1) {
        const date = new Date();
        const data: { [key: string]: any } = {
          createdAt: date,
          updatedAt: date,
        };
        row.values.slice(1).forEach((value: any, index: number) => {
          data[headers[index]] =
            value === -1
              ? null
              : headers[index] === "ingredients"
              ? value?.split(", ")
              : value;
        });
        records.push(data);
      }
    });

    if (records.length) {
      await collection.insertMany(records);
      logger.info(`${Process} completed...`);
    } else {
      logger.info("No data found in CSV file.");
    }
  } catch (error) {
    logger.error(`${Process} failed...`);
    logger.info("Error while seeding data: ", error);
  }
}

seedData();
