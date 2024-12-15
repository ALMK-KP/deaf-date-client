import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmDialogActionEnum } from '../utils/enums';
import { ConfirmDialogData, Track } from '../utils/interfaces';
import { TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  confirmDialogOptions$ = new Subject<
    Partial<TuiSheetDialogOptions<ConfirmDialogData>>
  >();
  trackContextMenuDialogOptions$ = new Subject<
    Partial<TuiSheetDialogOptions<any>>
  >();
  confirmDialogAction$ = new Subject<ConfirmDialogActionEnum>();
  openStreamingDialog$ = new Subject<boolean>();

  openConfirmDialog(
    label: string,
    confirmBtnLabel: string,
    actionType: ConfirmDialogActionEnum,
  ) {
    this.confirmDialogOptions$.next({
      label,
      data: { confirmBtnLabel, actionType },
    });
  }

  openTrackContextMenuDialog(track: Track) {
    this.trackContextMenuDialogOptions$.next({
      data: track,
    });
  }

  openStreamingDialog() {
    this.openStreamingDialog$.next(true);
  }
}
