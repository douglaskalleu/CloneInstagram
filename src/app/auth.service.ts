import { User } from "./acesso/user.model";
import * as firebase from 'firebase/auth';
import { getDatabase, ref, set} from "firebase/database";

export class Auth{
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
        console.log(response)
        )
       .catch((error: Error) =>
        console.log('Wrong: ', error)
       )
       
    }
}

