import { BEData } from './../../../../shared/models/be-data.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  categores: string[] = [];
  form: FormGroup;
  image: any;

  constructor(
    private productService: ProductService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.form = this.builder.group({
      title: [``, Validators.required],
      price: [``, Validators.required],
      description: [``, Validators.required],
      image: [``],
      categores: [``],
    });
  }
  getCategory(): void {
    this.productService.getAllCategories().subscribe((res) => {
      this.categores = res;
    });
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
    this.productService.addNewProduct(PRODUCT).subscribe(
      (res) => {
        console.log(res);
        this.form.reset();
      },
      (error) => {
        alert(error);
      }
    );
  }
}
