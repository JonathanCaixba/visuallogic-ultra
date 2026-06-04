import { NextResponse } from "next/server";
import { querySalesforce } from "@/services/salesforce/salesforce-query";

export async function GET() {
  try {
    const result = await querySalesforce(
      "SELECT Id, Name FROM Account LIMIT 5"
    );

    return NextResponse.json({
      success: true,
      totalSize: result.totalSize,
      records: result.records
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error
          ? error.message
          : "Unknown error"
      },
      {
        status: 500
      }
    );
  }
}