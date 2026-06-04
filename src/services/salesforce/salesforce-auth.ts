export interface SalesforceTokenResponse {
  access_token: string;
  token_type: string;
  instance_url?: string;
}

export async function getSalesforceToken() {
  const loginUrl = process.env.NEXT_PUBLIC_SF_LOGIN_URL;
  const clientId = process.env.SF_CLIENT_ID;
  const clientSecret = process.env.SF_CLIENT_SECRET;

  if (!loginUrl || !clientId || !clientSecret) {
    throw new Error("Missing Salesforce environment variables");
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret
  });

  const response = await fetch(
    `${loginUrl}/services/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json() as Promise<SalesforceTokenResponse>;
}