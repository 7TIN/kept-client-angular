// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppLayout } from './layouts/app-layout/app-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

// 1. Import your new Home component
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      // 2. Add the route for the home page
      { path: '', component: Home },
      // { path: 'companies', component: CompaniesPageComponent },
      // { path: 'experience', component: ExperiencesPageComponent },
    ]
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ]
  }
];