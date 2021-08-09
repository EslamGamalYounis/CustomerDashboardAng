export class ControllerMapper{

  mapcontroller :Map<string,string>;

  /**
   *
   */
  constructor(key:string,value:string) {

    this.mapcontroller.set(key,value);
  }
}
