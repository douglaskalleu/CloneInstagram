import { getDatabase, ref, set } from "firebase/database";
import { PublishModel } from "../ultils/publishModel";

export class FireDataBase{

    public sedToDataBase(publish: PublishModel) :void{
        // const bd = getDatabase();
        // set(ref(bd, `publish/${btoa(publish.email)}`), {title: publish.title});
    }

}