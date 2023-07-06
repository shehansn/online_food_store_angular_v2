import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { FoodAddEditPageComponent } from './components/pages/food-add-edit-page/food-add-edit-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },//canActivate: [AuthGuard]
  { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard] },
  { path: 'track/:orderId', component: OrderTrackPageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'addFood', component: FoodAddEditPageComponent, canActivate: [AuthGuard] },
  { path: 'editFood/:id', component: FoodAddEditPageComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
