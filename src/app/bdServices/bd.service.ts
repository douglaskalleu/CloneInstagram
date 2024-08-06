import { Injectable } from "@angular/core";
import { PublishModel } from "../ultils/publishModel";
import { FireDataBase } from "./bd-firedatabase";
import { Progress } from "../progress.service";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

@Injectable()
export class Bd {

    public currentUser!: any;
    public publications: any;
    constructor(
        private progress: Progress,
    ){}

    public fire :FireDataBase = new FireDataBase();

    public publish(publish: PublishModel):void {
        this.getUserToPost(publish);
    }

    //TODO Melhor o retorno do email do usuario logado
    public getUserToPost(publish: PublishModel): void{
        firebase.auth().onAuthStateChanged((user) => {
            publish.email = user?.email!;
            this.fire.sedToDataBase(publish, this.progress);
          });
    }
}