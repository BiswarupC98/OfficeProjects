import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private http: HttpClient) { }

  keyword:any;
  count:any;
  data:any;
  chart:any;
  chart2:any;
  chart3:any;

 onClick()
  {
    this.http.post<any>('http://127.0.0.1:3000/',{keyword:this.keyword,
    count:this.count }).subscribe(data => {
      console.log(data);
      this.chart= new Chart({
        chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
        },
        title: {
        text: 'Twitter-Sentiment-Analysis'
        },
        tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
        point: {
        
        }
        },
        plotOptions: {
        pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
        }
        },
        series: [{
        type:'pie',
        name: 'Brands',
        colorByPoint: true,
        data:data.pie1
        }]
        });
      this.chart2= new Chart({
      chart: {
      type: 'column'
      },
      title: {
      text: 'Average Retweets'
      },
      subtitle: {
      text: 'Source: twitter.com'
      },
      xAxis: {
      categories: [
      'retweet range'
      ],
      crosshair: true
      },
      yAxis: {
      min: 0,
      title: {
      text: 'Average'
      }
      },
      tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} retweets</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
      },
      plotOptions: {
      column: {
      pointPadding: 0.2,
      borderWidth: 0
      }
      },
      series:data.pie2
      
      

        });
      this.chart3= new Chart({
          chart: {
          type: 'line'
          },
    title: {
      text: 'retweets'
      },
  subtitle: {
      text: 'Source: thesolarfoundation.com'
  },
  yAxis: {
      title: {
          text: 'favtweets'
      }
  },

  xAxis: {
    categories: ['10- range','10-30 range','30-50 range','50+ range']
  },
  plotOptions: {
    line: {
        dataLabels: {
            enabled: true
        },
        enableMouseTracking: false
    }
},
  series: data.pie3,
        });
    })
  }
  ngOnInit()
  {
  }
}
