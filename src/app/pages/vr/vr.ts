import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
    selector: 'app-vr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vr.html',
  styleUrls: ['./vr.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class VRComponent {
  constructor() {}
}
