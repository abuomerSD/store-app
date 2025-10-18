import { Request, Response } from "express";
import puppeteer from "puppeteer";

import { ICategory, IStockMovement } from "../types";
import { StockMovementModel } from "../models/stockMovement.model";
import { Types } from "mongoose";
import { ProductModel } from "../models/product.model";

const findAll = async (): Promise<IStockMovement[] | null> => {
  const movements: IStockMovement[] = await StockMovementModel.find();
  if (movements) {
    return movements;
  }
  return null;
};

const findById = async (id: string): Promise<IStockMovement | null> => {
  const movement: IStockMovement | null = await StockMovementModel.findById(id);
  return movement;
};

const save = async (
  movement: IStockMovement
): Promise<IStockMovement | null> => {
  const saved: IStockMovement | null = await StockMovementModel.create(
    movement
  );
  return saved;
};

const updateById = async (
  id: string,
  movement: IStockMovement
): Promise<IStockMovement | null> => {
  const updated: IStockMovement | null =
    await StockMovementModel.findOneAndUpdate({ _id: id }, movement);
  return updated;
};

const deleteById = async (id: string): Promise<IStockMovement | null> => {
  const deleted: IStockMovement | null =
    await StockMovementModel.findOneAndDelete({ _id: id });
  return deleted;
};

const paginateByProductId = async (
  page: number,
  limit: number,
  id: Types.ObjectId
) => {
  const skip = (page - 1) * limit;
  console.log("type of id", typeof id);
  console.log("id", id);
  // const movements = await StockMovementModel.find();
  const movements = await StockMovementModel.find({ product: id })
    .populate("createdBy", "username")
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });

  console.log("movements", movements);
  const total_rows = (await StockMovementModel.find({ product: id })).length;
  return {
    total_rows,
    movements,
  };
};

const getProductMovementReport = async (id: Types.ObjectId) => {
  const movements = await StockMovementModel.find({ product: id })
    .populate("createdBy", "username")
    .sort({ createdAt: -1 });

  const total_rows = (await StockMovementModel.find({ product: id })).length;
  return {
    total_rows,
    movements,
  };
};

const generateProductMovementReport = async (id: Types.ObjectId) => {
  console.log("genereate product report starts...");
  const startTime = Date.now();
  const movements = await StockMovementModel.find({ product: id })
    .populate("createdBy", "username")
    .sort({ createdAt: -1 });

  console.log("movements", movements);

  const product = await ProductModel.findById(id);

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Build the HTML report
  const html = `
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600&display=swap');

            body {
              font-family: 'Cairo', sans-serif;
              margin: 40px;
              direction: rtl;
            }

            .header {
              text-align: center;
              border-bottom: 2px solid #444;
              margin-bottom: 20px;
              padding-bottom: 10px;
              position: running(header);
            }

            .product-details {
              display: flex;
              justify-content: space-between;
            }

            .company-name {
              font-size: 22px;
              font-weight: bold;
            }

            .report-title {
              font-size: 18px;
              margin-top: 5px;
            }

            .product-name {
              font-size: 18px;
              font-weight: bold;
              margin: 20px 0 10px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }

            th, td {
              border: 1px solid #444;
              padding: 8px;
              text-align: center;
            }

            th {
              background-color: #eee;
            }

            @page {
              margin: 40px;
              @top-center {
                content: element(header);
              }
            }

            .footer {
              text-align: center;
              position: fixed;
              bottom: 0;
              width: 100%;
              font-size: 12px;
              color: #777;
            }

            .page-break {
              page-break-after: always;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">شركة شلفا لإدارة المرافق</div>
            <div class="report-title">تقرير حركة المنتج</div>
          </div>

          <div class="product-details">
            <div class="product-name">الكود: ${
              product?.code ? product.code : "product code"
            }</div>
            <div class="product-name">المنتج: ${
              product?.name ? product.name : "product name"
            }</div>
          </div>

          ${generateTables(movements)}

          <div class="footer">
            تم إنشاء التقرير بتاريخ ${new Date().toLocaleDateString("ar-EG")}
          </div>
        </body>
      </html>
    `;

  await page.setContent(html, { waitUntil: "networkidle0" });

  // Generate PDF buffer
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  const endTime = Date.now();

  const reportTime = endTime - startTime;

  console.log("report done...");
  console.log("report time: " + reportTime);

  return pdfBuffer;
};

// Helper function to split movements into multiple tables
function generateTables(movements: any[]) {
  const chunkSize = 15;
  const pages = [];

  for (let i = 0; i < movements.length; i += chunkSize) {
    const chunk = movements.slice(i, i + chunkSize);
    pages.push(`
      <table>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>نوع العملية</th>
            <th>الكمية</th>
            <th>تم الانشاء بواسطة</th>
            <th>الوصف</th>
          </tr>
        </thead>
        <tbody>
          ${chunk
            .map(
              (m, index) => `
                <tr>
                  <td>${new Date(m.createdAt || "").toLocaleDateString()}</td>
                  <td>${m.movementType}</td>
                  <td>${m.quantity}</td>
                  <td>${m.createdBy.username || ""}</td>
                  <td>${m.note}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
      ${
        i + chunkSize < movements.length ? '<div class="page-break"></div>' : ""
      }
    `);
  }

  return pages.join("");
}

const stockMovementService = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
  paginateByProductId,
  getProductMovementReport,
  generateProductMovementReport,
};

export default stockMovementService;
