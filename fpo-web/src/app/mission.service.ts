import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MissionService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<any>();
  private missionConfirmedSource = new Subject<any>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(allFormData: any) {
    this.missionAnnouncedSource.next(allFormData);
  }

  confirmMission(formData: any) {
    this.missionConfirmedSource.next(formData);
  }
}
