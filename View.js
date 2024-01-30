'use strict';
class View{

  constructor(model){
    this.model = model;
    
    this.colors={
      'slate700': 'rgb(51 65 85)',
      'zinc50': 'rgb(250 250 250)'
    }
    this.learningChartJs();
  }
    
  
  learningChartJs(){
    const ctx = document.getElementById('myChart');
    ctx.width = 500;
    ctx.height = 500;
  
    new Chart(ctx, {
      type: 'pie', // good one are: pie, bar, doughnut
      data: {
        labels: ['GoldBees', 'SilverBees', 'NiftyBees', 'BankBees', 'LiquidBees(EmegerencyFund)', 'LiquidBees (Reserved for Buying GoldBees, SilverBees, NiftyBees and BankBees)'],
        datasets: [{
          label: 'Investment ₹',
          data: [1073, 1013, 3344, 8036, 69000, 51000],
          borderWidth: 1,
          // borderColor: 'white',
          // backgroundColor: 'white',
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            ticks:{
              color:this.colors.slate700,
            },
            grid: {
              color:this.colors.slate700,
            },            
          },
          y: {
            beginAtZero: true,
            ticks:{
              color:this.colors.slate700,
            },
            grid: {
              color:this.colors.slate700,
            }               
          }          
        },
        plugins: {
          legend: {
            labels: {
              color:this.colors.zinc50,
              font: {
                family: 'Roboto',
                size: '20px', // Change the size according to your preference                
                weight: 'semibold' // Change the weight (normal, bold, 100-900)
              }              
            }

          }
        }
      }
    });
  }
  
}  

