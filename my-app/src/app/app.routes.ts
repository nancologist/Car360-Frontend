import {Routes} from '@angular/router';
import {HomeComponent} from '../pages/home/home.component';
import {CarDetailsComponent} from '../pages/car-details/car-details.component';
import {LoginComponent} from '../pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'car/:id',
        component: CarDetailsComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
