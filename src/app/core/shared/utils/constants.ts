export const DEFAULT_ORB_SUGGESTIONS: string[] = [
  'Quiero realizar check-in',
  'Necesito ayuda con mi reserva',
  '¿Cuáles son los servicios del hotel?',
  'Recomiéndame lugares para visitar cerca',
  '¿A qué hora es el desayuno?',
  'Extender mi reservación',
  'Facturación de mi estancia',
  'Solicitar ayuda a un empleado',
];

export const IntentsUrls = {
  PAY_RESERVATION: '/pay-reservation',
  SEARCH_RESERVATION: '/reservation-list',
  MODIFY_RESERVATION: '/modify-reservation',
  CANCEL_RESERVATION: '/cancel-reservation',
};

export const IntentKeys = {
  PAY_RESERVATION: 'PAY_RESERVATION',
  SEARCH_RESERVATION: 'SEARCH_RESERVATION',
  MODIFY_RESERVATION: 'MODIFY_RESERVATION',
  CANCEL_RESERVATION: 'CANCEL_RESERVATION',
};

export const EntityNames = {
  GUEST_NAME: 'GUEST_NAME',
};

export const RESERVATION_PAYMENT_STATUS = [
  'Pendiente de pago',
  'Pagos parciales',
  'Noche en curso pagada',
  'Prepagada',
];

export const PREPAID_PAYMENTS = ['Tarjeta virtual', 'Cupon', 'Puntos'];

export const ROOM_TYPES = ['Doble', 'Sencilla', 'Suite'];
