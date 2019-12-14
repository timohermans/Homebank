import { AbstractControl } from '@angular/forms';

export abstract class BaseModel {
  public abstract toForm(): any;
}
