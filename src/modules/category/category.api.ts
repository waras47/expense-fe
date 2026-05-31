// ── Langkah 2: Fungsi pemanggil API ──
// Hanya berisi panggilan HTTP. Tidak ada logika UI atau state di sini.

import { http } from '@/shared/api/http'
import type { Category, CategoryPayload } from './category.types'

export const categoryApi = {
  // GET /api/categories → ambil semua kategori
  getAll: () => http.get<Category[]>('/categories').then((r) => r.data),

  // POST /api/categories → buat kategori baru
  create: (data: CategoryPayload) =>
    http.post<Category>('/categories', data).then((r) => r.data),

  // DELETE /api/categories/:id → hapus kategori
  remove: (id: number) => http.delete(`/categories/${id}`).then((r) => r.data),
}
