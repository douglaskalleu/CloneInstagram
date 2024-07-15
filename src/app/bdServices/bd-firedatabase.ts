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

    public getPublish(email: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const storage: FireStorage = new FireStorage(this.progress);
            firebase.database().ref(`publish/${btoa(email)}`)
            .once('value')
            .then((snapShot: any) => {
                snapShot.forEach((childSnapShot: any) => {
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
                    resolve(publications)
                })
            })

        })
    }

    private postImage(publish: PublishModel, storage: FireStorage): void {
        storage.postStorage(publish);
    }
}