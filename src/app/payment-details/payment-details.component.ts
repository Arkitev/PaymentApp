import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public paymentService: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.paymentService.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.paymentService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(paymentDetailId: number) {
    if(confirm('Are you sure to delete this record?')) {
      this.paymentService.deletePaymentDetail(paymentDetailId).subscribe(
        res => {
          this.paymentService.refreshList();
          this.toastr.info("Deleted successfully", 'Payment Detail Register');
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
