import { Injectable } from "@angular/core";
import { PublishModel } from "../ultils/publishModel";
import { FireDataBase } from "./bd-firedatabase";
import { Progress } from "../progress.service";

@Injectable()
export class Bd {
    constructor(
        private progress: Progress,
    ){}

    public fire :FireDataBase = new FireDataBase();

    public publish(publish: PublishModel):void {
        this.fire.sedToDataBase(publish, this.progress);
    }
}