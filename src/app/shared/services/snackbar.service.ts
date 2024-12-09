import { inject, Injectable } from '@angular/core';
import { TuiAlertOptions, TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly alerts = inject(TuiAlertService);

  sharedSettings: Partial<TuiAlertOptions> = {
    closeable: false,
    autoClose: 2000,
  };

  success(message: string) {
    this.alerts
      .open(message, {
        ...this.sharedSettings,
        appearance: 'success',
      })
      .subscribe();
  }

  info(message: string) {
    this.alerts
      .open(message, { ...this.sharedSettings, appearance: 'info' })
      .subscribe();
  }
}
