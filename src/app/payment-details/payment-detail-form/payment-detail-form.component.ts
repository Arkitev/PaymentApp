import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public paymentDetailService: PaymentDetailService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.paymentDetailService.formData.paymentDetailId == 0) 
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.paymentDetailService.postPaymentDetail().subscribe(
      res => { 
        this.resetForm(form);
        this.paymentDetailService.refreshList();
        this.toastr.success('Submitted successfully', 'Payment Detail Register');
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.paymentDetailService.putPaymentDetail().subscribe(
      res => { 
        this.resetForm(form);
        this.paymentDetailService.refreshList();
        this.toastr.info('Updated successfully', 'Payment Detail Register');
      },
      err => {
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.paymentDetailService.formData = new PaymentDetail();
  }

}
