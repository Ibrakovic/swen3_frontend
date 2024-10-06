import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Import your components for routing
// Add other components if you have more views

const routes: Routes = [
  { path: '', component: AppComponent }, // Add your default route or change the component
  // Add other routes if necessary
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
