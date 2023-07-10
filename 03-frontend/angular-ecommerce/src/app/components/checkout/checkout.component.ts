import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CodeVerseFormService} from "../../services/code-verse-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears:number[] = [];
  creditCardMonths:number[] = [];
  checkoutFormGroup !: FormGroup;

  countries:Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder:FormBuilder,
              private codeVerseService: CodeVerseFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      billingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
      }),
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })
    });
// populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.codeVerseService.getCreditCardMonths(startMonth).subscribe(data => {
      this.creditCardMonths = data;
    })    //populate credit card years
    this.codeVerseService.getCreditCardYears().subscribe(data => {
      this.creditCardYears = data;
    })
    this.codeVerseService.getCountries().subscribe(data =>{
      this.countries = data;
    })
  }


  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
      const billingAddress = this.checkoutFormGroup.get('billingAddress');
      if (shippingAddress && billingAddress) {
        billingAddress.setValue(shippingAddress.value);
        this.billingAddressStates = this.shippingAddressStates;
      }
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();

      this.billingAddressStates = [];
    }
  }

  onSubmit(){
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }
    this.codeVerseService.getCreditCardMonths(startMonth).subscribe(data => {
      this.creditCardMonths = data;
    })
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code
    const countryName = formGroup?.value.country.name
    console.log(`${formGroupName} country code: ${countryCode}`)
    console.log(`${formGroupName} country name: ${countryName}`)

    this.codeVerseService.getStates(countryCode).subscribe(
        data =>{
          if (formGroupName === 'shippingAddress') {
            this.shippingAddressStates = data;
          }else {
            this.billingAddressStates = data;
          }
          //select first item by default
          // @ts-ignore
          formGroup?.get('state').setValue(data[0]);
        }
    );
  }
}
