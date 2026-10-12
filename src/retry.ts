type Transport = (url: string, init: RequestInit) => Promise<Response>;

// Retries network errors, timeouts and the given HTTP statuses; each attempt gets a fresh timeout.
// Every attempt is a Worker subrequest (Free plan: 50 per run), so keep attempts × calls under that.
export function retrying(transport: Transport, { statuses, delays, timeoutMs = 20_000 }: { statuses: number[]; delays: number[]; timeoutMs?: number }): Transport {
  return async (url, init) => {
    for (let attempt = 0; ; attempt++) {
      const last = attempt >= delays.length;
      try {
        const response = await transport(url, { ...init, signal: AbortSignal.timeout(timeoutMs) });
        if (last || !statuses.includes(response.status)) return response;
        await response.body?.cancel();
      } catch (error) {
        if (last) throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delays[attempt]));
    }
  };
}
