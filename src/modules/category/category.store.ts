// ── Langkah 3: Store (state management dengan Pinia) ──
// Menyimpan data kategori di memori + fungsi untuk mengubahnya.
// Komponen UI memanggil store ini, bukan langsung memanggil API.

import { defineStore } from "pinia";
import { ref } from "vue";
import { categoryApi } from "./category.api";
import type { Category, CategoryPayload } from "./category.types";

export const useCategoryStore = defineStore("category", () => {
  // State
  const categories = ref<Category[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Action: ambil semua kategori dari backend
  async function fetchCategories() {
    isLoading.value = true;
    error.value = null;
    try {
      categories.value = await categoryApi.getAll();
    } catch {
      error.value = "Gagal memuat kategori";
    } finally {
      isLoading.value = false;
    }
  }

  // Action: tambah kategori baru
  async function addCategory(payload: CategoryPayload): Promise<Category> {
    const created = await categoryApi.create(payload);
    categories.value.push(created);
    return created;
  }

  // Action: hapus kategori
  async function removeCategory(id: number) {
    await categoryApi.remove(id);
    categories.value = categories.value.filter((c) => c.id !== id);
  }

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    addCategory,
    removeCategory,
  };
});
