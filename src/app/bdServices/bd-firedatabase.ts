import { getDatabase, ref, set } from "firebase/database";

export class FireDataBase{

    public sedToDataBase(publish: any) :void{
        const bd = getDatabase();
        set(ref(bd, `publish/${btoa(publish.email)}`), {title: publish.title});

        console.log(publish);
        console.log("Arrived here by add publication");
    }

}