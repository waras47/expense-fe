// ── Langkah 5: Daftar route milik modul ini ──
// Setiap modul mengekspor route-nya sendiri,
// lalu digabung di src/router/index.ts.

import type { RouteRecordRaw } from 'vue-router'

export const categoryRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'categories',
    component: () => import('./CategoriesView.vue'),
  },
]
