import { Routes } from '@angular/router';

// Import Layouts
import { AppLayout } from './layouts/app-layout/app-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

// Import Pages
import { Home } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { SignupComponent } from './pages/signup/signup';
import { ExperiencesPage } from './pages/experiences/experiences';
import { CompaniesPage } from './pages/companies/companies';

export const routes: Routes = [
  // Routes that use the main AppLayout (with Navbar)
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: Home, pathMatch: 'full' },
      { path: 'experience', component: ExperiencesPage },
      { path: 'companies', component: CompaniesPage }, // <-- Add the new route
    ]
  },

  // Specific route for Login, using the AuthLayout
  {
    path: 'login',
    component: AuthLayout,
    children: [
      { path: '', component: LoginComponent }
    ]
  },

  // Specific route for Signup, using the AuthLayout
  {
    path: 'signup',
    component: AuthLayout,
    children: [
      { path: '', component: SignupComponent }
    ]
  },

  // This wildcard redirect must be the LAST route in the array
  { path: '**', redirectTo: '', pathMatch: 'full' }
];