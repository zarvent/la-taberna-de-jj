import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina múltiples clases de CSS condicionalmente y resuelve conflictos de Tailwind.
 * Utiliza `clsx` para la lógica condicional y `tailwind-merge` para la resolución de conflictos.
 *
 * @param inputs - Lista de clases o condiciones.
 * @returns Cadena de clases CSS procesada.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
