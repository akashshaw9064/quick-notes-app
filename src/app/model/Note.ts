export class Note{
     id :number;
     title :string;
     desc :string;
    constructor(id : number, title :string, desc :string){
        this.id = id;
        this.title = title;
        this.desc = desc;
    }
    getTitle() :string{
        return this.title;
    }
    getDesc() :string{
        return this.desc;
    }
    getId() :number{
        return this.id;
    }
}