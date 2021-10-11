import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private httpClient: HttpClient) { }

  readonly baseURL = 'http://localhost:61236/api/PaymentDetail';
  formData: PaymentDetail = new PaymentDetail();
  paymentList: PaymentDetail[];

  refreshList() {
    this.httpClient.get(this.baseURL)
    .toPromise()
    .then(res => this.paymentList = res as PaymentDetail[]);
  }

  postPaymentDetail() {
    return this.httpClient.post(this.baseURL, this.formData);
  }

  putPaymentDetail() {
    return this.httpClient.put(`${this.baseURL}/${this.formData.paymentDetailId}`, this.formData);
  }

  deletePaymentDetail(paymentDetailId: number) {
    return this.httpClient.delete(`${this.baseURL}/${paymentDetailId}`);
  }

}


