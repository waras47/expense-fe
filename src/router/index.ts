// ── Router utama ──
// Menggabungkan route dari semua modul.
// Tambah modul baru? Import routes-nya lalu sebar (...) di array di bawah.

import { createRouter, createWebHistory } from "vue-router";
import { categoryRoutes } from "@/modules/category/routes";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...categoryRoutes,
    // ...expenseRoutes,   ← contoh menambah modul berikutnya
  ],
});

export default router;
