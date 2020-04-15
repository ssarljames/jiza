import { FormGroup } from '@angular/forms';
export class Model {

  public id?: string;


  public created_at?: Date;
  public updated_at?: Date;

  public _method?: string;

  public _removing: boolean;

  public static newInstance(obj: any): any{

    const model = new Model();

    if(obj)
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          model[key] = obj[key];
        }
      }

    return model;
  }

  public static collection(obj: any[]): any[]{
    let arr = [];

    if(obj && obj.length > 0)
      arr = obj.map( (o): any => {
        return Model.newInstance(o);
      })

    return arr;
  }

  public formFill(form: FormGroup): any{

    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        this[key] = form.controls[key].value;
      }
    }

    return this;
  }

  public set(name: string, value: any): any{
    this[name] = value;
    return this;
  }

  public get is_saved(): boolean{
    return this.id ? true : false;
  }
}
