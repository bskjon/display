import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectingPageComponent } from './pages/connecting-page/connecting-page.component';
import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { OfflinePageComponent } from './pages/offline-page/offline-page.component';

const routes: Routes = [
  { path: "", component: DefaultPageComponent },
  { path: "offline", component: OfflinePageComponent },
  { path: "connecting", component: ConnectingPageComponent},
  { path: "display", component: DisplayPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
