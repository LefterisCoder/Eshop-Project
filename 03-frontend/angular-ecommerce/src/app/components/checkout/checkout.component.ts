import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkoutFormGroup !: FormGroup;
  constructor(private formBuilder:FormBuilder) { }

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

  }

  copyShippingAddressToBillingAddress(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
      const billingAddress = this.checkoutFormGroup.get('billingAddress');
      if (shippingAddress && billingAddress) {
        billingAddress.setValue(shippingAddress.value);
      }
    } else {
      this.checkoutFormGroup.get('billingAddress')?.reset();
    }
  }

  onSubmit(){
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }


}
