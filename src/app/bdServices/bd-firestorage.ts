import { PublishModel } from "../ultils/publishModel";
import { Progress } from "../progress.service";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

export class FireStorage {
    constructor(private progress: Progress) { }

    public postStorage(publish: PublishModel): void {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${publish.imageName}`);
        const uploadTask = uploadBytesResumable(storageRef, publish.image);

        uploadTask.on("state_changed", (snapshot) => {
            this.progress.status = "Running";
            this.progress.state = snapshot;
        },
        (error) => {
            this.progress.status = "Error";
        },
        () => {
            this.progress.status = "Finished";
        });
    }

    public getImagensPublished(childSnapShot: any, email: string): void {
        const storage = firebase.storage();
        let publications: Array<any> = [];
        let publish = childSnapShot.val();
        storage.ref()
            .child(`images/${childSnapShot.key}`)
            .getDownloadURL()
            .then((url: string) => {
                publish.image_url = url;
                firebase.database().ref(`detail_user/${btoa(email)}`)
                .once('value')
                .then((snapShot) =>{
                    publish.user_name = snapShot.val().user.user_name
                })
                publications.push(publish);
            })
        console.log(publications)
    }
}