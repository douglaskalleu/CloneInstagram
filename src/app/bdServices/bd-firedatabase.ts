import { getDatabase, push } from "firebase/database";
import { PublishModel } from "../ultils/publishModel";
import { Progress } from "../progress.service";
import { FireStorage } from "./bd-firestorage";
import * as firebase from 'firebase/database';

export class FireDataBase{
    
    public sedToDataBase(publish: PublishModel, progress: Progress):void{
        const storage :FireStorage = new FireStorage(progress);
        const reff = firebase.ref(getDatabase(), `publish/${btoa(publish.email)}`);
        push(reff, {title: publish.title})
        .then((response: any) => {
            publish.imageName = response.key;
            this.postImage(publish, storage);
        });
        
        // const bd = getDatabase();
        // set(ref(bd, `publish/${btoa(publish.email)}`), {title: publish.title});
    }

    private postImage(publish: PublishModel, storage: FireStorage):void {
        storage.postStorage(publish);
    }
}