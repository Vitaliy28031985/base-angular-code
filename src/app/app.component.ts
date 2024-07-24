import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoListComponent } from './component/video-list/video-list.component';
import { LoginComponent } from './component/login/login.component';
import { AuthComponent } from './component/auth/auth.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VideoListComponent, LoginComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
