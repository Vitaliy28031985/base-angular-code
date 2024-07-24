import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService } from '../../video/video.service';
import { VideoListComponent } from '../video-list/video-list.component';

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
  selector: 'app-video-item',
  standalone: true,
  imports: [],
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.scss'
})
export class VideoItemComponent {
  @Input() video!: VideoItem; 
  videoList = inject(VideoListComponent);
  

  constructor(private videoService: VideoService) {

  }


  
delete(id: string): void {
  if (id) {
     // @ts-ignore
    this.videoService.deleteVideo(id).subscribe(
      () => {
       
         // @ts-ignore
        this.videoList.getVideos();
       console.log('Відео успішно видалено 12');
      },
       // @ts-ignore
      error => {
        console.error('Помилка при видаленні відео:', error);
      }
    );
  }
}



}
