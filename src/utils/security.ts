/**
 * Security & Input Sanitization Utilities
 * PT. PRIMA TEKNIK TRADA
 * Melindungi dari celah XSS (Cross-Site Scripting), HTML Injection,
 * malicious redirect, dan karakter berbahaya pada form input & URL.
 */

/**
 * Membersihkan string teks dari tag HTML berbahaya, script injection,
 * dan karakter kontrol tidak sah.
 */
export function sanitizeText(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') {
    return '';
  }

  // 1. Potong string jika melebihi panjang wajar
  const truncated = input.slice(0, maxLength);

  // 2. Bersihkan tag HTML berbahaya dan script (<script>, <iframe>, <style>, dll)
  const cleaned = truncated
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '') // Strip semua sisa tag HTML
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, ''); // Hapus karakter kontrol biner

  return cleaned.trim();
}

/**
 * Validasi dan sanitasi URL gambar CAD atau dokumen (hanya izinkan http/https protokol aman).
 * Mencegah celah javascript: atau data: URL injection.
 */
export function sanitizeUrl(url: unknown): string | null {
  if (typeof url !== 'string' || !url.trim()) {
    return null;
  }

  const trimmed = url.trim();

  // Validasi format protokol yang sah
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.href;
  } catch {
    // Jika bukan URL absolut yang valid
    return null;
  }
}

/**
 * Sanitasi alamat email dari spasi atau karakter ilegal.
 */
export function sanitizeEmail(email: unknown): string {
  if (typeof email !== 'string') return '';
  const cleaned = email.trim().toLowerCase();
  // Validasi pola email standar RFC-5322 ringkas
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(cleaned) ? cleaned : '';
}

/**
 * Sanitasi nomor telepon/WhatsApp (hanya perbolehkan angka, tanda plus, spasi, dan tanda hubung).
 */
export function sanitizePhone(phone: unknown): string {
  if (typeof phone !== 'string') return '';
  return phone.replace(/[^0-9+\s-]/g, '').trim();
}
