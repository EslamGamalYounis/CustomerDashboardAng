import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Service } from './../classes/Service';
import { ChartsService } from '../services/charts.service';
import { element } from 'protractor';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit,OnDestroy {

  serivces:Service[];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['pink', 'yellow','orange','rgba(148,159,177,0.2)'],
    borderColor: ['rgba(135,206,250,1)', 'rgba(106,90,205,1)', 'rgba(148,159,177,1)','rgba(148,159,177,1)']
 }];
  subcriber;
  constructor(private chartsService:ChartsService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }
  ngOnDestroy(): void {
    this.subcriber.unsubscribe();
  }

  ngOnInit(): void {
    this.subcriber =this.chartsService.getServices().subscribe(
      (respond)=>{
       this.serivces= respond;

       this.serivces.forEach(element => {
          this.pieChartLabels.push (element.serviceName);
       });
      },
    (error)=>{
      console.log(error)
    });

    this.subcriber =this.chartsService.getServicesCountsByName('WIFI').subscribe(
      (data:number)=>{
        this.pieChartData.push(data);
      },
      (error)=>{
         console.log(error);
      }
    );

    this.subcriber =this.chartsService.getServicesCountsByName('4G').subscribe(
      (data:number)=>{
        this.pieChartData.push(data);
      },
      (error)=>{
         console.log(error);
      }
    );

    this.subcriber =this.chartsService.getServicesCountsByName('VDSL').subscribe(
      (data:number)=>{
        this.pieChartData.push(data);
      },
      (error)=>{
         console.log(error);
      }
    );

    this.subcriber =this.chartsService.getServicesCountsByName('ADSL').subscribe(
      (data:number)=>{
        this.pieChartData.push(data);
      },
      (error)=>{
         console.log(error);
      }
    );
  //this.getCountPerService();
  }

  getCountPerService(){
    for(let i=0;i<this.pieChartLabels.length;i++){
      this.chartsService.getServicesCountsByName(this.pieChartLabels[i].toString()).subscribe(
        (data:number)=>{
          this.pieChartData.push(data);
        },
        (error)=>{
           console.log(error);
        }
      );
    }
  }



}
