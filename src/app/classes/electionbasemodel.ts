import { ReplaySubject } from 'rxjs/Rx';

export class ElectionBaseModel {

  private _chairperson: string;
  public get chairperson(): string {
    return this._chairperson;
  }
  public set chairperson(_chairperson) {
    this._chairperson = _chairperson;
    this.chairpersonObservable.next(_chairperson);
  }
  public chairpersonObservable = new ReplaySubject<string>(1);

  constructor() { }
}
