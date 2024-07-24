import { Component, signal } from '@angular/core';
import { VideoItemComponent } from '../video-item/video-item.component';
import { VideoService } from '../../video/video.service';
import { AddComponent } from '../add/add.component';
interface VideoItem {
        _id: string,
        title: string,
        description: string,
        link: string,
        owner: string,
        createdAt: string,
        updatedAt: string
}


@Component({
  selector: 'app-video-list',
  standalone: true,
  imports: [VideoItemComponent, AddComponent],
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.scss'
})
export class VideoListComponent {
  videos: VideoItem[] | null = null
  isShowModal = signal<boolean>(false);
  constructor(private videoService: VideoService) {
    
  }

  isShowAddModal(): void {
  this.isShowModal.set(!this.isShowModal())
}
  ngOnInit(): void {
    this.getVideos()  
 this.subscribeToDataSubject();   
  
  }
  
  getVideos() {
  this.videoService.getVideo().subscribe(
      (data: VideoItem[]) => {
       
     this.videos = data;
     return data
      },
      error => {
        console.error('Помилка при отриманні відео:', error);
      }
    );
  }

  subscribeToDataSubject(): void {
    this.videoService.getDataSubject().subscribe(
      data => {
        this.videos = data; // Оновлення вашого списку відео на сторінці
      },
      error => {
        console.error('Помилка при оновленні даних через dataSubject:', error);
      }
    );
  }

}
