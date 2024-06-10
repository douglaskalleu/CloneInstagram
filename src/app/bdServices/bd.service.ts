import { Injectable } from "@angular/core";
import { PublishModel } from "../ultils/publishModel";
import { FireDataBase } from "./bd-firedatabase";
import { Progress } from "../progress.service";
import * as firebase from 'firebase/auth';

@Injectable()
export class Bd {
    constructor(
        private progress: Progress,
    ){}

    public fire :FireDataBase = new FireDataBase();

    public publish(publish: PublishModel):void {
        this.fire.sedToDataBase(publish, this.progress);
    }

    public getUserEmail(): string{
        let email: string = ''
        firebase.getAuth().onAuthStateChanged((user) => {
            email = user?.email!;
          });
          return email;
    }

    public getPublish(email: string): any{
        this.fire.getPublish(email);
    }
}