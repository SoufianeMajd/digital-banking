import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './admin-template.html',
  styleUrl: './admin-template.css'
})
export class AdminTemplate {

}
