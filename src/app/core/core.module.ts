import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './error-handler.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';

import localePt from '@angular/common/locales/pt';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localePt, "pt-BR");

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    DatePipe,
    TranslateService,
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
  ],
  exports: [NavbarComponent, ConfirmDialogModule, ToastModule]
})
export class CoreModule { }
