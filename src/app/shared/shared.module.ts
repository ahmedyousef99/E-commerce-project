import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [HeaderComponent, SelectComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, SelectComponent, SpinnerComponent],
})
export class SharedModule {}
