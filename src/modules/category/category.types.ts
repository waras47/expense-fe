// ── Langkah 1: Definisikan bentuk data (kontrak) ──
// Semua tipe untuk modul Category ada di sini.

// Data kategori yang diterima DARI backend
export interface Category {
  id: number;
  name: string;
  color: string;
}

// Data yang DIKIRIM ke backend saat membuat kategori
export interface CategoryPayload {
  name: string;
  color?: string;
}
