import { User } from "./acesso/user.model";
import * as firebase from 'firebase/auth'

export class Auth{
    public registerUser(user: User): void{
        console.log('Tamo aew no servico mano: ', user);

        const auth = firebase.getAuth();
        firebase.createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('user: ', user);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
    }
}