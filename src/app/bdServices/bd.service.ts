import { FireDataBase } from "./bd-firedatabase";

export class Bd {
    public fire :FireDataBase = new FireDataBase();

    public publish(publish: any):void {

        this.fire.sedToDataBase(publish);

    }
}