import { Routes } from '@angular/router';
import { VideoListComponent } from './component/video-list/video-list.component';
import { canActivateAuth } from './auth/access.guard';
import { AuthComponent } from './component/auth/auth.component';

export const routes: Routes = [
    { path: '', component: AuthComponent },
    {path: 'video', component: VideoListComponent, canActivate: [canActivateAuth]}
];
