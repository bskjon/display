import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { ElectricityComponent } from './view/electricity/electricity.component';
import { ConnectingPageComponent } from './pages/connecting-page/connecting-page.component';
import { DefaultPageComponent } from './pages/default-page/default-page.component';
import { DisplayPageComponent } from './pages/display-page/display-page.component';
import { OfflinePageComponent } from './pages/offline-page/offline-page.component';
import { LiveCounterViewComponent } from './view/live-counter-view/live-counter-view.component';

const routes: Routes = [
  { path: "", component: DefaultPageComponent },
  { path: "offline", component: OfflinePageComponent },
  { path: "connecting", component: ConnectingPageComponent},
  { path: "display", component: DisplayPageComponent},
  { path: "demo_elprice", component: ElectricityComponent},
  { path: "demo", component: LiveCounterViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
