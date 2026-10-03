export const WHATSAPP_NUMBER = "919270139519";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppWithMessage(message: string) {
  const whatsappWindow = window.open(createWhatsAppUrl(message), "_blank");
  if (!whatsappWindow) return false;

  whatsappWindow.opener = null;
  return true;
}
