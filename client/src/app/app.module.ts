import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { TitleComponent } from './components/partials/title/title.component';
import { CartSummaryComponent } from './components/partials/cart-summary/cart-summary.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidatonComponent } from './components/partials/input-validaton/input-validaton.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingSvgComponent } from './components/partials/Loader/loading-svg/loading-svg.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    TagsComponent,
    TitleComponent,
    CartSummaryComponent,
    NotFoundComponent,
    InputContainerComponent,
    InputValidatonComponent,
    TextInputComponent,
    DefaultButtonComponent,
    LoadingComponent,
    LoadingSvgComponent,
    OrderItemsListComponent,
    MapComponent,
    PaypalButtonComponent,
    StarRatingComponent,
    HomeComponent,
    FoodPageComponent,
    CartPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    CheckoutPageComponent,
    PaymentPageComponent,
    OrderTrackPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      newestOnTop: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
