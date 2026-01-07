import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/sqlite-testing/reservation.service';
import Reservation from '../../../models/Reservation';
import { DatePipe, NgFor } from '@angular/common';
import Rate from '../../../models/Rate';

@Component({
  selector: 'app-reservation-list',
  imports: [NgFor, DatePipe],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent {
  public reservations: Reservation[];
  public displayedReservations: Reservation[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private reservationService: ReservationService
  ) {
    this.reservations = [];
    this.displayedReservations = [];
  }

  ngOnInit(): void {
    this.getReservationLocator();
  }

  public calculateTotalRates(rates: Rate[]): string {
    return Number(
      rates.reduce((accum, current) => {
        return (accum += current.total);
      }, 0)
    ).toFixed(2);
  }

  private getReservationLocator(): void {
    // const activateLocators = this.activatedRouter.snapshot.paramMap.keys;
    // console.log(activateLocators);
    // let locators: Record<string, any> = {};
    // activateLocators.forEach((locatorName) => {
    //   console.log(locatorName);
    //   locators[locatorName] =
    //     this.activatedRouter.snapshot.paramMap.get(locatorName);
    // });

    const guestName =
      this.activatedRouter.snapshot.queryParamMap.get('guestName');
    if (guestName) {
      // search for guest name
      const cleanNames = guestName.replace('-', ' ');
      const reservation = this.reservationService
        .searchByGuestName(cleanNames)
        .subscribe({
          next: (response) => {
            // map to reservation
            this.reservations = [
              ...response.map((item: any) => {
                return {
                  id: item.id,
                  reservationId: item.reservationId,
                  rates: JSON.parse(item.rates), // always stored as string
                  confirmation: item.confirmation,
                  room: item.room,
                  roomType: item.roomType,
                  guest: {
                    guestId: item.g_id,
                    email: item.g_email,
                    names: item.g_names,
                    surnames: item.g_surnames,
                    phone: item.g_phone,
                  },
                  dateIn: item.dateIn,
                  dateOut: item.dateOut,
                  status: item.status,
                  paymentStatus: item.paymentStatus,
                };
              }),
            ];

            console.log(this.reservations);
            this.displayedReservations = [...this.reservations];
          },
          error: (error) => {},
        });
    }
  }
}
