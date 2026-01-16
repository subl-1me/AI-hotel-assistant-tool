import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from '../../../services/sqlite-testing/reservation.service';
import Reservation from '../../../models/Reservation';
import { DatePipe } from '@angular/common';
import Rate from '../../../models/Rate';
import { RESERVATION_STATUES } from '../../../shared/utils/constants';
import { AiAssistantListenerComponent } from '../../../shared/components/ai-assistant-listener/ai-assistant-listener.component';

@Component({
  selector: 'app-reservation-list',
  imports: [DatePipe, AiAssistantListenerComponent],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent {
  public reservations: Reservation[];
  public displayedReservations: Reservation[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private reservationService: ReservationService,
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
      }, 0),
    ).toFixed(2);
  }

  public getReservationStatusLabel(status: string): string {
    return (
      RESERVATION_STATUES[status as keyof typeof RESERVATION_STATUES] || status
    );
  }

  public getReservationRoomTypeLabel(roomType: string): string {
    switch (roomType) {
      case 'SINGLE':
        return 'Sencilla';
      case 'DOUBLE':
        return 'Doble';
      case 'SUITE':
        return 'Suite';
      default:
        return roomType;
    }
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
      this.reservationService.searchByGuestName(guestName).subscribe({
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

          this.displayedReservations = [...this.reservations];
        },
        error: (error) => {},
      });
    }
  }
}
