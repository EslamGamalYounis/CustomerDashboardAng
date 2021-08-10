import { Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartsService } from './../services/charts.service';
import { CountPerMonthAndYear } from './../classes/CountPerMonthAndYear';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit , OnDestroy ,OnChanges {

  constructor(private chartsService:ChartsService) { }

  ngOnChanges(changes: SimpleChanges): void {
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

    this.getCountPerMonthsPerYear(new Date().getFullYear());
  }

  getCountPerMonthsPerYear(year:number){
      this.subscriber = this.chartsService.getCountMonthsPerYear(year).subscribe(
        (data:CountPerMonthAndYear[])=>{
          this.countPerMonthAndYear = data.slice();

          let initData:ChartDataSets[] = [{ data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Customer Count Per Months And Year' }];
          this.lineChartData = initData ;
          if(this.countPerMonthAndYear !=null){
          let x:number = 0;
          this.countPerMonthAndYear.forEach(item=>{
              this.lineChartData[0].data[x] = item.count;
              x++;
          })

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
