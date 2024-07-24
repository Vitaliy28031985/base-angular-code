import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VideoService } from '../../video/video.service';
import { VideoListComponent } from '../video-list/video-list.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
 form = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    link: new FormControl(null, Validators.required)
  
 })
  
  videoService = inject(VideoService)
  videoList = inject(VideoListComponent)
  
  
 

  onSubmit(): void {
    if (this.form.valid) {
      // @ts-ignore
    this.videoService.addVideo(this.form.value).subscribe(
      () => {
        // @ts-ignore
        this.videoList.getVideos();
        this.videoList.isShowAddModal();
      },
      error => {
        this.videoList.isShowAddModal();
        console.error('Помилка при додаванні відео:', error);
         
      }
    );
  }
}

}
