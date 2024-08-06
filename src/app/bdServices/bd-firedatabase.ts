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
            firebase.database().ref(`publish/${btoa(email)}`)
                .orderByKey()
                .once("value")
                .then((snapshot: any) => {
                    //console.log(snapshot.val());
                    let publications: Array<any> = []
                    snapshot.forEach((childSnapshot: any) => {
                        let publish = childSnapshot.val();
                        publish.key = childSnapshot.key;
                        publications.push(publish);
                    })
                    //console.log(publicacoes)
                    return publications.reverse();
                })
                .then((publications: any) => {
                    //console.log(publications);
                    publications.forEach((publish: any) => {
                        firebase.storage().ref()
                            .child(`images/${publish.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publish.image_url = url
                                firebase.database().ref(`detail_user/${btoa(email)}`)
                                    .once("value")
                                    .then((snapshot: any) => {
                                        publish.user_name = snapshot.val().user.user_name
                                    })
                            })
                    })
                    resolve(publications)
                })  
        })
    }

    private postImage(publish: PublishModel, storage: FireStorage): void {
        storage.postStorage(publish);
    }
}                        