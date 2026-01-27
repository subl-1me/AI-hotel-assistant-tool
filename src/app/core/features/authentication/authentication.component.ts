import { Component, OnInit } from '@angular/core';
import { AiAssistantListenerComponent } from '../../shared/components/ai-assistant-listener/ai-assistant-listener.component';
import { ActivatedRoute } from '@angular/router';
import Reservation from '../../models/Reservation';
import { ReservationService } from '../../services/sqlite-testing/reservation.service';

@Component({
  selector: 'app-authentication',
  imports: [AiAssistantListenerComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
    private reservationService: ReservationService,
  ) {}
  public confirmationNumber: string = '';
  public userEmail: string = '';

  async ngOnInit(): Promise<void> {
    this.confirmationNumber =
      this.activatedRouter.snapshot.queryParamMap.get('confirmation') || '';

    await this.loadReservation();
  }

  private async loadReservation(): Promise<void> {
    if (!this.confirmationNumber) return;

    this.reservationService
      .getReservationByConfirmationNumber(this.confirmationNumber)
      .subscribe({
        next: (reservation) => {
          const email = reservation.g_email || '';
          // Simple obfuscation: show only the first letter and domain
          const [localPart, domain] = email.split('@');
          if (localPart && domain) {
            this.userEmail = localPart.charAt(0) + '*****@' + domain;
          } else {
            this.userEmail = '*****';
          }
        },
        error: (error) => {
          console.error('Error fetching reservation:', error);
        },
      });
  }
}
