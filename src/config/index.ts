export async function fetcher<T>(url: string, options: RequestInit = {}) {
    const res = await fetch(url, { ...options, method: "GET" });
    const json = await res.json();

    return json as T;
}
