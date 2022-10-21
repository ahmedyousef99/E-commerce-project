import { BEData } from 'src/app/shared/models/be-data.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: any;
  product: BEData;
  activeSpinner: boolean = false;

  constructor(
    private activeRout: ActivatedRoute,
    private proService: ProductService
  ) {}

  ngOnInit(): void {
    let ids: any = this.activeRout.snapshot.paramMap.get('id');
    console.log(ids);
    this.getDetails(ids);
  }
  getDetails(id: any): void {
    this.activeSpinner = true;

    this.proService.getProductDetails(id).subscribe((res) => {
      console.log(res);
      this.product = res;
      this.activeSpinner = false;
    });
  }
}
