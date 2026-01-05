import { CartItem } from '@/types';
import { CONTACT_INFO } from '@/constants/contact';

export function generateWhatsAppMessage(items: CartItem[]): string {
  const message = `Hello ${CONTACT_INFO.name}, I am interested in the following services from Gangaram Enterprises: \n${items.map((i) => `- ${i.name}`).join('\n')}`;
  return `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodeURIComponent(message)}`;
}

