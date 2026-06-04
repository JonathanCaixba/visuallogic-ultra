import { getSalesforceToken } from "./salesforce-auth";

export async function querySalesforce(soql: string) {
  const token = await getSalesforceToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SF_LOGIN_URL}/services/data/v61.0/query?q=${encodeURIComponent(
      soql
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}