 export class ApiUrl{

   apiUrl:string = "http://localhost:51329/api/";
   controllerNameArr;
   constructor() {
      this.apiUrl ="http://localhost:51329/api/";
      this.controllerNameArr = new Map<string,string>();
      this.controllerNameArr.set("customerCountPerService",this.apiUrl+"customer/count/service");
      this.controllerNameArr.set("customerCountPerYear",this.apiUrl+"customer/count/year/");
      this.controllerNameArr.set("serviceNames",this.apiUrl+"service");
      this.controllerNameArr.set("customerPaginateList",this.apiUrl+"customer");
   }
 }

