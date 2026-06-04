import { NextResponse } from "next/server";
import { querySalesforce } from "@/services/salesforce/salesforce-query";

export async function GET() {
  try {
    const result = await querySalesforce(`
      SELECT Id, Name
      FROM Account
      ORDER BY Name
      LIMIT 20
    `);

    return NextResponse.json(result.records);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error"
      },
      {
        status: 500
      }
    );
  }
}