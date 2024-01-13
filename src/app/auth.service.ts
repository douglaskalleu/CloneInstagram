import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "./acesso/user.model";
import { getDatabase, ref, set} from "firebase/database";
import * as firebase from 'firebase/auth';


@Injectable()
export class Auth{
    public tokenId: string | undefined;
    private auth = firebase.getAuth();
    private codError: string = '';

    constructor(private routes: Router){ }

    public registerUser(user: User): Promise<any>{
        return firebase.createUserWithEmailAndPassword(this.auth, user.email, user.password!)
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
            this.codError = error.code;
            console.error("DECODE ERROR MESSAGE: " + JSON.stringify(error));
        });
    }

    public AuthOnInstagram(email: string, password: string): string{
       firebase.signInWithEmailAndPassword(this.auth, email, password)
       .then((response: any) => 
            this.auth.currentUser?.getIdToken()
                .then((idToken: string) => {
                    this.tokenId = idToken;
                    localStorage.setItem('idToken', idToken);
                    this.routes.navigate(['/home']);
                })
        )
       .catch((error) => {
            this.codError = error.code;
            console.error("DECODE ERROR MESSAGE: " + JSON.stringify(error));
        })
       
        return this.codError;
    }

    public authenticated(): boolean{
        let currentToken = localStorage.getItem('idToken')

        if(this.tokenId === undefined && currentToken != null){
            this.tokenId = currentToken;
        }

        if(this.tokenId === undefined){
            this.routes.navigate(['/']);
        }

        return this.tokenId !== undefined;
    }

    public logoff(): void{
        
        firebase.signOut(this.auth)
        .then(()=> {
            localStorage.removeItem('idToken');
            this.tokenId = undefined;
            this.routes.navigate(['/']);
        });
      }
}

