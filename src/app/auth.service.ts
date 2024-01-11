import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./acesso/user.model";
import { getDatabase, ref, set} from "firebase/database";
import * as firebase from 'firebase/auth';

@Injectable()
export class Auth{
    public tokenId: string | undefined;

    constructor(private routes: Router){ }

    public registerUser(user: User): Promise<any>{
        const auth = firebase.getAuth();
        return firebase.createUserWithEmailAndPassword(auth, user.email, user.password!)
        .then((response: any) => {

            // Remove password
            delete user.password;

            // Register new users
            const dataBase = getDatabase();
            set(ref(dataBase, `detail_user/${btoa(user.email)}`), {
                user
              });
        })
        .catch((error) => {
            console.log('error: ', error);
        });
    }

    public AuthOnInstagram(email: string, password: string): void{
       const auth = firebase.getAuth();
       firebase.signInWithEmailAndPassword(auth, email, password)
       .then((response: any) => 
            auth.currentUser?.getIdToken()
                .then((idToken: string) => {
                    this.tokenId = idToken;
                    this.routes.navigate(['/home']);
                })
        )
       .catch((error: Error) =>
            console.log('Wrong: ', error)
       )
       
    }

    public authenticated(): boolean{
        return this.tokenId !== undefined;
    }
}

