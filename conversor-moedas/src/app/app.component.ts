import { Component } from '@angular/core';
import {ConversorMoedasService} from "./conversor-moedas.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conversor-moedas';
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number = 0;
  convertedAmount: number = 0;
  convertedAmountFormatted: string = '';
  currencies: Currency[] = [
    { code: 'EUR', name: 'Euro - EUR', symbol: '€' },
    { code: 'USD', name: 'Dólar Americano - USD', symbol: '$' },
    { code: 'BRL', name: 'Real Brasileiro - BRL', symbol: 'R$' },
    { code: 'GBP', name: 'Libra Esterlina - GBP', symbol: '£' },
    { code: 'JPY', name: 'Iene Japonês - JPY', symbol: '¥' },
    { code: 'CAD', name: 'Dólar Canadense - CAD', symbol: 'CA$' },
    { code: 'CHF', name: 'Franco Suíço - CHF', symbol: 'CHF' },
    { code: 'AUD', name: 'Dólar Australiano - AUD', symbol: 'A$' },
    { code: 'RMB', name: 'Yuan Renminbi Chinês - RMB', symbol: '¥' },
    { code: 'MXN', name: 'Peso Mexicano - MXN', symbol: '$' },
    { code: 'NZD', name: 'Dólar Neozelandês - NZD', symbol: 'NZ$' },
    { code: 'SGD', name: 'Dólar de Singapura - SGD', symbol: 'S$' },
    { code: 'ARS', name: 'Peso Argentino - ARS', symbol: '$' },
    { code: 'RUB', name: 'Rublo Russo - RUB', symbol: '₽' },
    { code: 'HKD', name: 'Dólar de Hong Kong - HKD', symbol: 'HK$' },
    { code: 'BSD', name: 'Dólar Bahamense - BSD', symbol: '$' },
    { code: 'INR', name: 'Rupia Indiana - INR', symbol: '₹' },
    { code: 'ILS', name: 'Novo Shekel Israelense - ILS', symbol: '₪' },
    { code: 'SEK', name: 'Coroa Sueca - SEK', symbol: 'kr' },
    { code: 'DKK', name: 'Coroa Dinamarquesa - DKK', symbol: 'kr' },
    { code: 'NOK', name: 'Coroa Norueguesa - NOK', symbol: 'kr' },
    { code: 'KRW', name: 'Won Sul-Coreano - KRW', symbol: '₩' },
    { code: 'COP', name: 'Peso Colombiano - COP', symbol: '$' },
    { code: 'CLP', name: 'Peso Chileno - CLP', symbol: '$' },
    { code: 'AED', name: 'Dirham dos Emirados Árabes Unidos - AED', symbol: 'د.إ' },
    { code: 'UYU', name: 'Peso Uruguaio - UYU', symbol: '$U' },
    { code: 'BBD', name: 'Dólar Barbadense - BBD', symbol: '$' },
    { code: 'AWG', name: 'Florim Arubano - AWG', symbol: 'ƒ' },
    { code: 'ANG', name: 'Florim das Antilhas Holandesas - ANG', symbol: 'ƒ' },
    { code: 'AMD', name: 'Dram Armênio - AMD', symbol: '֏' },
    { code: 'AOA', name: 'Kwanza Angolano - AOA', symbol: 'Kz' },
    { code: 'AZM', name: 'Manat Azerbaijano - AZM', symbol: 'ман' },
    { code: 'BAM', name: 'Marco Conversível da Bósnia-Herzegovina - BAM', symbol: 'KM' },
    { code: 'BDT', name: 'Taka de Bangladesh - BDT', symbol: '৳' },
    { code: 'BHD', name: 'Dinar Bareinita - BHD', symbol: '.د.ب' },
    { code: 'BIF', name: 'Franco Burundês - BIF', symbol: 'FBu' },
    { code: 'BMD', name: 'Dólar Bermudense - BMD', symbol: '$' },
    { code: 'BND', name: 'Dólar de Brunei - BND', symbol: 'B$' },
    { code: 'BOB', name: 'Boliviano - BOB', symbol: 'Bs.' },
    { code: 'BTN', name: 'Ngultrum do Butão - BTN', symbol: 'Nu.' },
    { code: 'BWP', name: 'Pula de Botswana - BWP', symbol: 'P' },
    { code: 'BYR', name: 'Rublo Bielorrusso - BYR', symbol: 'р.' },
    { code: 'BZD', name: 'Dólar Belizeano - BZD', symbol: 'BZ$' },
    { code: 'CDF', name: 'Franco Congolês - CDF', symbol: 'FC' },
    { code: 'CUC', name: 'Peso Cubano Conversível - CUC', symbol: 'CUC$' },
    { code: 'CVE', name: 'Escudo Cabo-verdiano - CVE', symbol: '$' },
    { code: 'CZK', name: 'Coroa Checa - CZK', symbol: 'Kč' },
    { code: 'DJF', name: 'Franco Djibutiano - DJF', symbol: 'Fdj' },
    { code: 'DKK', name: 'Coroa Dinamarquesa - DKK', symbol: 'kr' },
    { code: 'DOP', name: 'Peso Dominicano - DOP', symbol: 'RD$' },
    { code: 'DZD', name: 'Dinar Argelino - DZD', symbol: 'د.ج' },
    { code: 'EGP', name: 'Libra Egípcia - EGP', symbol: '£' },
    { code: 'ERN', name: 'Nakfa da Eritreia - ERN', symbol: 'Nfk' },
    { code: 'ETB', name: 'Birr Etíope - ETB', symbol: 'Br' },
    { code: 'FJD', name: 'Dólar Fijiano - FJD', symbol: '$' },
    { code: 'GEL', name: 'Lari Georgiano - GEL', symbol: '₾' },
    { code: 'GHS', name: 'Cedi Ganês - GHS', symbol: '₵' },
    { code: 'GIP', name: 'Libra de Gibraltar - GIP', symbol: '£' },
    { code: 'GMD', name: 'Dalasi Gambiano - GMD', symbol: 'D' },
    { code: 'GNF', name: 'Franco Guineense - GNF', symbol: 'FG' },
    { code: 'GTQ', name: 'Quetzal Guatemalteco - GTQ', symbol: 'Q' },
    { code: 'GYD', name: 'Dólar Guianense - GYD', symbol: '$' },
    { code: 'HNL', name: 'Lempira Hondurenha - HNL', symbol: 'L' },
    { code: 'HTG', name: 'Gourde Haitiano - HTG', symbol: 'G' },
    { code: 'HUF', name: 'Florim Húngaro - HUF', symbol: 'Ft' },
    { code: 'IDR', name: 'Rupia Indonésia - IDR', symbol: 'Rp' },
    { code: 'ILS', name: 'Novo Shekel Israelense - ILS', symbol: '₪' },
    { code: 'INR', name: 'Rupia Indiana - INR', symbol: '₹' },
    { code: 'ISK', name: 'Coroa Islandesa - ISK', symbol: 'kr' },
    { code: 'JMD', name: 'Dólar Jamaicano - JMD', symbol: 'J$' },
    { code: 'JOD', name: 'Dinar Jordaniano - JOD', symbol: 'د.ا' },
    { code: 'KES', name: 'Xelim Queniano - KES', symbol: 'KSh' },
    { code: 'KGS', name: 'Som Quirguiz - KGS', symbol: 'с' },
    { code: 'KHR', name: 'Riel Cambojano - KHR', symbol: '៛' },
    { code: 'KRW', name: 'Won Sul-Coreano - KRW', symbol: '₩' },
    { code: 'KWD', name: 'Dinar Kuwaitiano - KWD', symbol: 'د.ك' },
    { code: 'KYD', name: 'Dólar das Ilhas Cayman - KYD', symbol: '$' },
    { code: 'KZT', name: 'Tenge Cazaque - KZT', symbol: '₸'}
  ];

  constructor(private currencyService: ConversorMoedasService) {}

  convert() {
    this.currencyService.converterMoeda(this.fromCurrency, this.toCurrency, this.amount)
      .subscribe((data) => {
        this.convertedAmount = data.convertedAmount;

        const toCurrencyObject = this.currencies.find(currency => currency.code === this.toCurrency);
        if (toCurrencyObject) {
          this.convertedAmountFormatted = `${toCurrencyObject.symbol} ${this.convertedAmount.toFixed(2)}`;
        } else {
          this.convertedAmountFormatted = `${this.convertedAmount.toFixed(2)}`;
        }
      });
  }
}
