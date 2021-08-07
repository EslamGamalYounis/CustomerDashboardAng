import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartsService } from './../services/charts.service';
import { CountPerMonthAndYear } from './../classes/CountPerMonthAndYear';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit , OnDestroy ,OnChanges {

  constructor(private chartsService:ChartsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

  }
  subscriber;
  yearList:number[]=[];
  selectedYear:number;
  countPerMonthAndYear:CountPerMonthAndYear[];

  lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Customer Count Per Months And Year' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June',
  'July','August','September','October','November','December'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  ngOnInit(): void {
    let year = new Date().getFullYear();
    let index=0;
    for(let i = year-10;i<=year;i++){
      this.yearList[index]=i;
      index++;
    }
    // console.log(this.lineChartData[0].data[0]);
    // console.log(typeof this.lineChartData[0].data[0]);

    this.getCountPerMonthsPerYear(new Date().getFullYear()-1);
  }

  getCountPerMonthsPerYear(year:number){
      this.subscriber = this.chartsService.getCountMonthsPerYear(year).subscribe(
        (data:CountPerMonthAndYear[])=>{
          this.countPerMonthAndYear = data;

          if(this.countPerMonthAndYear !=null){
          this.countPerMonthAndYear.forEach(item=>{
            switch(item.month){
              case "January":{
                this.lineChartData[0].data[0] = item.count;
                break;
              }

              case "February":{
                this.lineChartData[0].data[1] = item.count;
                break;
              }

              case "March":{
                this.lineChartData[0].data[2] = item.count;
                break;
              }

              case "April":{
                this.lineChartData[0].data[3] = item.count;
                break;
              }

              case "May":{
                this.lineChartData[0].data[4] = item.count;
                break;
              }

              case "June":{
                this.lineChartData[0].data[5] = item.count;
                break;
              }

              case "July":{
                this.lineChartData[0].data[6] = item.count;
                break;
              }

              case "August":{
                this.lineChartData[0].data[7] = item.count;
                break;
              }

              case "September":{
                this.lineChartData[0].data[8] = item.count;
                break;
              }

              case "October":{
                this.lineChartData[0].data[9] = item.count;
                break;
              }

              case "November":{
                this.lineChartData[0].data[10] = item.count;
                break;
              }

              case "December":{
                this.lineChartData[0].data[11] = item.count;
                break;
              }
            }})
          }
        },
        (error)=>{
          console.log(error);
        }
      )
  }

  changedYear(year){
    this.selectedYear = year;
    this.getCountPerMonthsPerYear(this.selectedYear);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }


}
