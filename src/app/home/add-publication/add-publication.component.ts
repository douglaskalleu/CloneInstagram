import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, interval, takeUntil } from 'rxjs';
import { Bd } from 'src/app/bdServices/bd.service';
import { Progress } from 'src/app/progress.service';
import { PublishModel } from 'src/app/ultils/publishModel';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {

  constructor(
    private bd: Bd,
    private progress: Progress
  ){ }

  @Output() public refreshTimeLine: EventEmitter<any> = new EventEmitter<any>();

  public email: string = '';
  public publishProgress: string = 'Pending';
  public uploadPercent: number | undefined;
  private image: any;

  public form: FormGroup = new FormGroup({
    'title': new FormControl(null)
  })

  ngOnInit(){  }

  public publish(): void{
    this.bd.publish(this.mountPublishData());

    let followUpload = interval(1500);
    let keepWay = new Subject();
    keepWay.next(true);

    followUpload
    .pipe(takeUntil(keepWay))
    .subscribe(() => {
      console.log(this.progress.state);
      console.log(this.progress.status);
      this.publishProgress = 'Running';
      this.uploadPercent = Math.round((this.progress.state.bytesTransferred / this.progress.state.totalBytes) * 100);

      if(this.progress.status === 'Finished') {
        this.publishProgress = this.progress.status;
        this.refreshTimeLine.emit();
        keepWay.next(false);
      }
    });
  }

  public prepareUploadImage(event: Event): void{
    this.image = (<HTMLInputElement>event.target).files;
  }

  public closeModal():void{
    this.publishProgress = 'Pending';
    this.uploadPercent = 0;
  }

  private mountPublishData(): PublishModel{
    const publishData = new PublishModel();
    publishData.email = this.email;
    publishData.title = this.form.value.title;
    publishData.image = this.image[0];

    return publishData;
  }
}
