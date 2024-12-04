import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmDialogActionEnum } from '../utils/enums';
import { ConfirmDialogData } from '../utils/interfaces';
import { TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  confirmDialogOptions$ = new Subject<
    Partial<TuiSheetDialogOptions<ConfirmDialogData>>
  >();
  confirmDialogAction$ = new Subject<ConfirmDialogActionEnum>();

  openConfirmDialog(
    label: string,
    confirmBtnLabel: string,
    actionType: ConfirmDialogActionEnum,
  ) {
    this.confirmDialogOptions$.next({
      label,
      data: { confirmBtnLabel, actionType, isOpened: true },
    });
  }
}
