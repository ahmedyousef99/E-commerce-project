import { BEData } from './../../../../shared/models/be-data.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  categores: string[] = [];
  form: FormGroup;
  image: any;
  productIdForEdit: number;
  Subscription: Subscription[] = [];
  currentProduct: BEData = {} as BEData;
  select: string;

  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductService,
    private builder: FormBuilder
  ) {
    this.form = this.builder.group({
      title: [``, Validators.required],
      price: [``, Validators.required],
      description: [``, Validators.required],
      image: [``],
      categores: [``],
    });
  }
  ngOnDestroy(): void {
    this.Subscription.forEach((e) => {
      e.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.productIdForEdit = +this.activeRouter.snapshot.paramMap.get(`id`);
    console.log(this.productIdForEdit);
    // this.sub = this.activeRouter.params.subscribe((params: Params) => {
    //   this.productIdForEdit = params[`id`];
    //   console.log(this.productIdForEdit);
    // });
    console.log(this.currentProduct);
    this.getSingleProduct(this.productIdForEdit);
    this.getCategory();
  }

  getSingleProduct(id: number): void {
    var sub = this.productService.getProductDetails(id).subscribe((res) => {
      console.log(res);
      this.currentProduct = res;
      this.image = this.currentProduct.image;
      this.select = this.currentProduct.category;

      this.form.setValue({
        title: this.currentProduct.title,
        price: this.currentProduct.price,
        description: this.currentProduct.description,
        image: this.currentProduct.image,
        categores: this.currentProduct.category,
      });
    });
    this.Subscription.push(sub);
  }

  getCategory(): void {
    var sub = this.productService.getAllCategories().subscribe((res) => {
      this.categores = res;
    });
    this.Subscription.push(sub);
  }

  onSelected(value: any): void {
    let selectedCategory: string = value.target.value;
    console.log(selectedCategory);
    this.form.get(`categores`).setValue(selectedCategory);
    console.log(this.form.value);
    console.log(selectedCategory);
  }

  getImageBase(value: any): void {
    const file = value.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = reader.result;
      this.form.get(`image`).setValue(this.image);
    };
  }

  addProduct(): void {
    const PRODUCT = this.form.value;
    var sub = this.productService.addNewProduct(PRODUCT).subscribe(
      (res) => {
        console.log(res);
        this.form.reset();
      },
      (error) => {
        alert(error);
      }
    );
    this.Subscription.push(sub);
  }
}
