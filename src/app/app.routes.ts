import { Routes } from '@angular/router';
import { ConsultationComponent } from './consultation/consultation.component';
import { PhysicianComponent } from './physician/physician.component';

export const routes: Routes = [
    { path: 'consultation', component: ConsultationComponent },{ path: 'physician', component: PhysicianComponent },
];
