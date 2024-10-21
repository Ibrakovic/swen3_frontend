import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';  // Import the AppComponent

const routes: Routes = [
  { path: '', component: AppComponent },  // Use AppComponent for the root path
  { path: '**', redirectTo: '' }  // Optional: Redirect unknown paths to root
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
