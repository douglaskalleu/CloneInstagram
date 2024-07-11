import { push } from "firebase/database";
import { PublishModel } from "../ultils/publishModel";
import { Progress } from "../progress.service";
import { FireStorage } from "./bd-firestorage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

export class FireDataBase {
    private progress: Progress = new Progress();

    public sedToDataBase(publish: PublishModel, progress: Progress): void {
        const storage: FireStorage = new FireStorage(progress);
        const reff = firebase.database().ref(`publish/${btoa(publish.email)}`);
        push(reff, { title: publish.title })
            .then((response: any) => {
                publish.imageName = response.key;
                this.postImage(publish, storage);
            });
    }

    public getPublish(email: string): any {
        const storage: FireStorage = new FireStorage(this.progress);
        firebase.database().ref(`publish/${btoa(email)}`)
            .once('value')
            .then((snapShot: any) => {

                //let publications: Array<any>[];
                // snapShot.forEach((childSnapShot: any) => {
                //     let publish = childSnapShot.val();

                //     firebase.storage().ref()
                //     .child(`images/${childSnapShot.key}`)
                //     .getDownloadURL()
                //     .then((url: string) => {
                //         publish.url_image = url;

                //         firebase.database().ref(`detail_user/${btoa(email)}`)
                //         .once('value')
                //         .then((snapShot: any) => {
                //             console.log(snapShot.val())
                //         })
                //     })
                // })

                snapShot.forEach((childSnapShot: any) => {
                    storage?.getImagensPublished(childSnapShot, email)
                })
            })
    }

    private postImage(publish: PublishModel, storage: FireStorage): void {
        storage.postStorage(publish);
    }
}