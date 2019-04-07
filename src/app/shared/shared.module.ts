import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DataScrollerModule } from 'primeng/datascroller';
import {
  PasswordModule, CheckboxModule, SelectButtonModule, CalendarModule,
  RadioButtonModule, InputTextModule, ButtonModule, InputMaskModule, InputTextareaModule,
  DropdownModule, MultiSelectModule, ListboxModule, SpinnerModule, DialogModule, SharedModule, 
  DataTableModule, DataGridModule, TooltipModule, ContextMenuModule, TabViewModule,
  GrowlModule, FileUploadModule, ConfirmDialogModule, CaptchaModule, ProgressSpinnerModule,
  OverlayPanelModule, MessagesModule, MessageModule, AutoCompleteModule, ToggleButtonModule
} from 'primeng/primeng';

import { AccordionModule } from 'primeng/accordion';


@NgModule({
  imports: [
    CommonModule,

    // PrimeNG imports
    PasswordModule, CheckboxModule, SelectButtonModule, CalendarModule,
    RadioButtonModule, InputTextModule, ButtonModule, InputMaskModule, InputTextareaModule,
    DropdownModule, MultiSelectModule, ListboxModule, SpinnerModule, DialogModule,
    DataTableModule, DataGridModule, TooltipModule, ContextMenuModule, TabViewModule,
    GrowlModule, FileUploadModule, ConfirmDialogModule, CaptchaModule, ProgressSpinnerModule,
    OverlayPanelModule, MessagesModule, MessageModule, AutoCompleteModule, TableModule,
    ToggleButtonModule, BrowserAnimationsModule,
    AccordionModule, DataScrollerModule, SharedModule
  ],
  declarations: [

  ],
  providers: [

  ],
  exports: [

    // PrimeNG exports
    PasswordModule, CheckboxModule, SelectButtonModule, CalendarModule,
    RadioButtonModule, InputTextModule, ButtonModule, InputMaskModule, InputTextareaModule,
    DropdownModule, MultiSelectModule, ListboxModule, SpinnerModule, DialogModule,
    DataTableModule, DataGridModule, TooltipModule, ContextMenuModule, TabViewModule,
    GrowlModule, FileUploadModule, ConfirmDialogModule, CaptchaModule, ProgressSpinnerModule,
    OverlayPanelModule, MessagesModule, MessageModule, AutoCompleteModule, TableModule,
    ToggleButtonModule, BrowserAnimationsModule,
    AccordionModule, DataScrollerModule
  ]
})
export class SharedPrimengModule { }
