export function removeDiacritics(str: string): string {
    return str
      .normalize("NFD") // Chuyển về dạng Unicode tổ hợp
      .replace(/[\u0300-\u036f]/g, "") // xoa dau
      .toLowerCase();
  }
  