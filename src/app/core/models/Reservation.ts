import Guest from './Guest';
import Rate from './Rate';

export default interface Reservation {
  id: string;
  reservationId: string;
  rates: Rate;
  status: string;
  confirmation: string;
  paymentStatus: string;
  room: number;
  roomType: string;
  guest: Guest;
  dateIn: string;
  dateOut: string;
}
