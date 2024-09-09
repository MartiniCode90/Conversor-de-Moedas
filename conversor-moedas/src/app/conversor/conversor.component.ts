import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { ConversorMoedasService } from '../conversor-moedas.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent {

  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number = 0;
  convertedAmount: string = '';

  constructor(private conversorService: ConversorMoedasService) {}

  convert() {
    this.conversorService.converterMoeda(this.fromCurrency, this.toCurrency, this.amount)
      .subscribe((data: { convertedAmount: string; }) => {
        this.convertedAmount = data.convertedAmount;
      });
  }
}
