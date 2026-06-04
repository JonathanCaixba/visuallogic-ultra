import type { ApiErrorPayload } from "@/types";

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: ApiErrorPayload
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export class ApiClient {
  constructor(private readonly baseUrl = "") {}

  async get<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
    return this.request<TResponse>(path, { ...init, method: "GET" });
  }

  async post<TResponse, TBody>(path: string, body: TBody, init?: RequestInit): Promise<TResponse> {
    return this.request<TResponse>(path, {
      ...init,
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  private async request<TResponse>(path: string, init: RequestInit): Promise<TResponse> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {})
      }
    });

    const payload = (await response.json()) as TResponse | ApiErrorPayload;

    if (!response.ok) {
      const errorPayload = payload as ApiErrorPayload;
      throw new ApiClientError(errorPayload.message, response.status, errorPayload);
    }

    return payload as TResponse;
  }
}

export const apiClient = new ApiClient();
