import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './com/annaniks/sport-click-admin/interseptors/api.interceptor';
import { JwtInterceptor } from './com/annaniks/sport-click-admin/interseptors/jwt.interceptor';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LoadingComponent } from './com/annaniks/sport-click-admin/loading/loading.component';
import { LoadingService, LoginService, AppService } from './com/annaniks/sport-click-admin/services';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    CookieService,
    LoadingService,
    LoginService,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: 'BASE_URL',
      useValue: environment.API_URL
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
