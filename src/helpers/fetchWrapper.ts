import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { BASE_URL } from '../constants';

const controller = new AbortController();
const { signal } = controller;

function bindUrl(path: string) {
  const url = BASE_URL;

  return `${url}/${path}`;
}

async function handleResponse(response: Response | void) {
  try {
    const data = await response?.json?.();

    if (!response?.ok) {
      return Promise.reject(new Error(data?.message || 'Something went wrong'));
    }

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function get(url: string, options?: RequestInit) {
  const requestOptions = {
    method: 'GET',
    signal,
    ...options,
  } as RequestInit;

  if (signal.aborted) {
    return;
  }

  const response = await fetch(bindUrl(url), requestOptions);

  return handleResponse(response);
}

async function post(url: string, body: unknown, options?: RequestInit) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
    ...options,
  } as RequestInit;

  if (signal.aborted) {
    return;
  }

  const response = await fetch(bindUrl(url), requestOptions);
  return handleResponse(response);
}

async function put(url: string, body: unknown, options?: RequestInit) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
    ...options,
  } as RequestInit;

  if (signal.aborted) {
    return;
  }

  const response = await fetch(bindUrl(url), requestOptions);

  return response;
}

async function del(url: string, options?: RequestInit) {
  const requestOptions = {
    method: 'DELETE',
    signal,
    ...options,
  } as RequestInit;

  if (signal.aborted) {
    return;
  }

  const response = await fetch(bindUrl(url), requestOptions);

  return handleResponse(response);
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
  abortAll: () => controller.abort(),
};
