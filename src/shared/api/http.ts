import axios, { type AxiosInstance } from 'axios'

/**
 * Instance axios terpusat — dipakai semua modul.
 *
 * Backend Go membungkus response dengan format standar:
 *   sukses : { code, status, message, data }
 *   error  : { code, status, message }
 *
 * Interceptor di bawah "membuka" bungkus itu, jadi `response.data`
 * langsung berisi payload (`data`).
 */
export const http: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  (response) => {
    const body = response.data
    if (body && typeof body === 'object' && 'status' in body && 'code' in body) {
      response.data = body.data !== undefined ? body.data : body
    }
    return response
  },
  (error) => {
    const body = error.response?.data
    if (body && typeof body === 'object') {
      error.response.data = { error: body.message || body.error || 'Terjadi kesalahan' }
    }
    return Promise.reject(error)
  },
)

/** Ambil pesan error yang ramah dari error axios */
export function getErrorMessage(e: unknown, fallback = 'Terjadi kesalahan'): string {
  const err = e as { response?: { data?: { error?: string } } }
  return err?.response?.data?.error ?? fallback
}
