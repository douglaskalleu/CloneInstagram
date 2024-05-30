import { Injectable } from "@angular/core";
import { PublishModel } from "../ultils/publishModel";
import { FireDataBase } from "./bd-firedatabase";
import { FireStorage } from "./bd-firestorage";
import { Progress } from "../progress.service";

@Injectable()
export class Bd {
    constructor(
        private progress: Progress,
    ){}

    public fire :FireDataBase = new FireDataBase();
    public storage :FireStorage = new FireStorage(this.progress);

    public publish(publish: PublishModel):void {
        this.fire.sedToDataBase(publish);
        this.postImage(publish)
    }

    private postImage(publish: PublishModel):void{
        this.storage.postStorage(publish);
    }
}