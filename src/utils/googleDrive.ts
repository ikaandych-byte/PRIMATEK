/**
 * Google Drive URL Parser & Direct Image Preview Formatter
 * Mengonversi link sharing Google Drive menjadi link preview gambar yang langsung
 * dapat ditampilkan di tag <img> tanpa terhalang CORS atau autentikasi Google.
 */

export interface GoogleDriveParseResult {
  isGoogleDrive: boolean;
  fileId: string | null;
  directImageUrl: string;
  originalUrl: string;
}

export const parseGoogleDriveUrl = (url: string): GoogleDriveParseResult => {
  if (!url || typeof url !== 'string') {
    return {
      isGoogleDrive: false,
      fileId: null,
      directImageUrl: '',
      originalUrl: url || '',
    };
  }

  const cleanUrl = url.trim();

  // Pattern 1: /file/d/{fileId}/view, /file/d/{fileId}/edit
  const matchFileD = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    const fileId = matchFileD[1];
    return {
      isGoogleDrive: true,
      fileId,
      // Format Google User Content CDN (sangat cepat, handal & mendukung thumbnail)
      directImageUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      originalUrl: cleanUrl,
    };
  }

  // Pattern 2: id={fileId} parameter (?id=xxx atau &id=xxx)
  const matchIdParam = cleanUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) {
    const fileId = matchIdParam[1];
    return {
      isGoogleDrive: true,
      fileId,
      directImageUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      originalUrl: cleanUrl,
    };
  }

  // Pattern 3: uc?id={fileId} / open?id={fileId}
  const matchOpenId = cleanUrl.match(/(?:open|uc)\?(?:.*&)?id=([a-zA-Z0-9_-]+)/);
  if (matchOpenId && matchOpenId[1]) {
    const fileId = matchOpenId[1];
    return {
      isGoogleDrive: true,
      fileId,
      directImageUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
      originalUrl: cleanUrl,
    };
  }

  // Pattern 4: /folders/{folderId}
  const matchFolder = cleanUrl.match(/\/drive\/folders\/([a-zA-Z0-9_-]+)/);
  if (matchFolder && matchFolder[1]) {
    return {
      isGoogleDrive: true,
      fileId: matchFolder[1],
      directImageUrl: cleanUrl, // Folder tidak bisa di-render langsung sebagai 1 file gambar
      originalUrl: cleanUrl,
    };
  }

  // Bukan Google Drive, kembalikan URL aslinya
  return {
    isGoogleDrive: false,
    fileId: null,
    directImageUrl: cleanUrl,
    originalUrl: cleanUrl,
  };
};

/**
 * Format helper untuk rendering gambar langsung pada elemen <img>
 */
export const getSafeImageUrl = (url: string, fallbackUrl?: string): string => {
  if (!url) return fallbackUrl || '';
  const parsed = parseGoogleDriveUrl(url);
  return parsed.directImageUrl || fallbackUrl || url;
};
