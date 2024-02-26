package com.codeVerse.ecommerce.service;

import com.codeVerse.ecommerce.dto.PurchaseResponse;
import com.codeVerse.ecommerce.dto.Purchase;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
