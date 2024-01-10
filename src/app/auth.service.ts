import { User } from "./acesso/user.model";
import * as firebase from 'firebase/auth';
import { getDatabase, ref, set} from "firebase/database";

export class Auth{
    public registerUser(user: User): void{
        const auth = firebase.getAuth();
        firebase.createUserWithEmailAndPassword(auth, user.email, user.password!)
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
}

