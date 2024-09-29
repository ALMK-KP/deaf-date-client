import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  host: {
    '[class.grow]': 'isGrowing && !icon',
  },
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() color: 'green' | 'orange' = 'green';
  @Input() isLink = false;
  @Input() isGrowing = true;
  @Input() border = true;
  @Input() href = '#';
  @Input() message: string = '';
  @Input() size: 'small' | 'medium' = 'medium';
  @Input() icon: string = '';

  imgSize = {
    small: '12',
    medium: '24',
  };
}
