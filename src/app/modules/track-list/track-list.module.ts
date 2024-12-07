import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player/player.component';
import { TrackListComponent } from './track-list.component';
import { TrackListItemComponent } from './track-list-item/track-list-item.component';
import { TrackContextMenuDialogComponent } from './track-context-menu-dialog/track-context-menu-dialog.component';
import {TuiFade, TuiSkeleton} from '@taiga-ui/kit';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { AttachToDirective } from '../../shared/directives/attachTo.directive';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { PolymorpheusTemplate } from '@taiga-ui/polymorpheus';
import { TextareaEditInlineComponent } from '../create-playlist/textarea-edit-inline/textarea-edit-inline.component';
import { TuiSheetDialog } from '@taiga-ui/addon-mobile';
import { TuiHovered } from '@taiga-ui/cdk';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PlayerComponent,
    TrackListComponent,
    TrackListItemComponent,
    TrackContextMenuDialogComponent,
    TextareaEditInlineComponent,
  ],
  imports: [
    // NG
    CommonModule,
    // Custom
    AttachToDirective,
    // Lib
    TuiIcon,
    TuiButton,
    TuiHovered,
    TuiSkeleton,
    TuiSheetDialog,
    PolymorpheusTemplate,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    CdkDragPlaceholder,
    FormsModule,
    TuiFade,
  ],
  exports: [TrackListComponent, TextareaEditInlineComponent],
})
export class TrackListModule {}
