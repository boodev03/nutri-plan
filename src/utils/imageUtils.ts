import { IMAGE_CONSTRAINTS } from './constants';

export function createImageUrl(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeImageUrl(url: string): void {
  URL.revokeObjectURL(url);
}

export function isValidImageType(file: File): boolean {
  return IMAGE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type as "image/jpeg" | "image/png" | "image/jpg");
}

export function validateImageSize(file: File): boolean {
  const maxSize = IMAGE_CONSTRAINTS.MAX_SIZE_MB * 1024 * 1024;
  return file.size <= maxSize;
}