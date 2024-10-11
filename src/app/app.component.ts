import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from "./cart/cart.component";
import { ArqueoComponent } from './arqueo/arqueo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CartComponent, ArqueoComponent],
  templateUrl: './app.component.html',
  styles:''
})
export class AppComponent {
  title = 'copservirCart';
}
