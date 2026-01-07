import Reservation from './Reservation';

export default interface Guest {
  id?: string;
  guestId: string;
  email: string;
  names: string;
  surnames: string;
  phone: string;
  reservations?: Reservation[];
  createdAt?: Date;
  updatedAt?: Date;
}
