import { PublishModel } from "../ultils/publishModel";
import { Progress } from "../progress.service";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export class FireStorage{
    constructor(private progress: Progress){}

    public postStorage(publish: PublishModel): void{
        const storage = getStorage();
        const storageRef = ref(storage, `images/${publish.imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, publish.image);

        uploadTask.on("state_changed", (snapshot) =>{
            this.progress.status = "Running";
            this.progress.state = snapshot;
        },
        (error) =>{
            this.progress.status = "Error";
        },
        () => {
            this.progress.status = "Finished";
        });
    }
}