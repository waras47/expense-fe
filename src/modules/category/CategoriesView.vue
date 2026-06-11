<!-- ── Langkah 4: Komponen UI (halaman) ── -->
<!-- Menampilkan daftar kategori + form tambah + tombol hapus. -->
<!-- Semua data diambil dari store, bukan langsung dari API. -->

<template>
  <div class="page">
    <header class="header">
      <div>
        <h1 class="text-[#50d71e]">🏷️ Kategori</h1>
        <p class="muted">Contoh modul sederhana: list, tambah, hapus.</p>
      </div>
    </header>

    <!-- Form tambah -->
    <form class="card form" @submit.prevent="submit">
      <input
        v-model="form.name"
        class="input"
        placeholder="Nama kategori (cth: Makanan)"
      />
      <input v-model="form.color" type="color" class="color" />
      <button class="btn" :disabled="saving">
        {{ saving ? "Menyimpan..." : "+ Tambah" }}
      </button>
    </form>
    <p v-if="formError" class="error">{{ formError }}</p>

    <!-- Daftar kategori -->
    <div v-if="store.isLoading" class="muted center">Memuat...</div>
    <div v-else-if="store.error" class="error center">{{ store.error }}</div>
    <ul v-else-if="store.categories.length" class="list">
      <li v-for="cat in store.categories" :key="cat.id" class="card item">
        <span class="dot" :style="{ background: cat.color }"></span>
        <span class="name">{{ cat.name }}</span>
        <code class="muted">{{ cat.color }}</code>
        <button class="btn-del" @click="remove(cat.id)">🗑️</button>
      </li>
    </ul>
    <p v-else class="muted center">Belum ada kategori. Tambahkan di atas 👆</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useCategoryStore } from "./category.store";
import { getErrorMessage } from "@/shared/api/http";

const store = useCategoryStore();
const form = reactive({ name: "", color: "#2ABFA3" });
const saving = ref(false);
const formError = ref("");

// Saat halaman dibuka → ambil data
onMounted(() => store.fetchCategories());

async function submit() {
  formError.value = "";
  if (!form.name.trim()) {
    formError.value = "Nama kategori wajib diisi";
    return;
  }
  saving.value = true;
  try {
    await store.addCategory({ name: form.name.trim(), color: form.color });
    form.name = "";
  } catch (e) {
    formError.value = getErrorMessage(e);
  } finally {
    saving.value = false;
  }
}

async function remove(id: number) {
  if (!confirm("Hapus kategori ini?")) return;
  try {
    await store.removeCategory(id);
  } catch (e) {
    alert(getErrorMessage(e, "Gagal menghapus"));
  }
}
</script>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.header {
  margin-bottom: 1.5rem;
}
h1 {
  font-size: 1.6rem;
}
.muted {
  color: #888;
  font-size: 14px;
}
.center {
  text-align: center;
  padding: 2rem;
}
.error {
  color: #e8442a;
  font-size: 13px;
  margin: 8px 0;
}
.card {
  border: 2px solid #111;
  border-radius: 12px;
  background: #fff;
  box-shadow: 3px 3px 0 #111;
}
.form {
  display: flex;
  gap: 8px;
  padding: 12px;
  margin-bottom: 1rem;
  align-items: center;
}
.input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #111;
  border-radius: 8px;
  font-size: 14px;
}
.color {
  width: 44px;
  height: 38px;
  border: 2px solid #111;
  border-radius: 8px;
  cursor: pointer;
}
.btn {
  padding: 8px 16px;
  border: 2px solid #111;
  border-radius: 8px;
  background: #2abfa3;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
}
.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #111;
}
.name {
  font-weight: 600;
  flex: 1;
}
.btn-del {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
