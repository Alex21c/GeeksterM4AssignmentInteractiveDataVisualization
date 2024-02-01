"use strict";
class View {
    constructor(model){
        this.model = model;
        // chart metadata   
        this.chart = null;
        this.ctx = document.getElementById("myChart");
        this.ctx.width = 500;
        this.ctx.height = 500;
        this.colors = {
            "slate700": "rgb(51 65 85)",
            "zinc50": "rgb(250 250 250)"
        };
        this.stylesTable = {
            border: "border-solid border-2 border-slate-700"
        };
        this.chartMetadata = {
            data: {
                labels: [
                    "GoldBees",
                    "SilverBees",
                    "NiftyBees",
                    "BankBees",
                    "LiquidBees (Emegerency Fund)",
                    "LiquidBees (Reserved for Buying Gold, Silver, Nifty and BankBees)"
                ],
                datasets: [
                    {
                        label: "Investment \u20B9",
                        data: [
                            1073,
                            1013,
                            3344,
                            8036,
                            69000,
                            51000
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: {
                            color: this.colors.slate700
                        },
                        grid: {
                            color: this.colors.slate700
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: this.colors.slate700
                        },
                        grid: {
                            color: this.colors.slate700
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: this.colors.zinc50,
                            font: {
                                family: "Roboto",
                                size: "20px",
                                weight: "semibold" // Change the weight (normal, bold, 100-900)
                            }
                        }
                    }
                }
            }
        };
        // canvas configure
        // this.configureCanvas();
        // event listeners and DOM Fetching
        this.tableInvestmentData = document.querySelector("table#tableInvestmentData");
        // console.log(this.tableInvestmentData);
        this.selectChartType = document.querySelector("select#selectChartType");
        this.selectChartType.addEventListener("change", ()=>{
            // console.log(this.selectChartType.value);
            this.updateChartType(this.selectChartType.value);
        });
        window.addEventListener("resize", this.throttling(this.resizeChart, 200, this.ctx));
        // generating investment table
        this.generateInvestmentTable();
    // this.updateChartType('pie');
    // this.selectChartType.classList.remove('displayNone'); 
    }
    throttling(callback, delay, ctx) {
        let intervalId = null;
        return ()=>{
            if (intervalId !== null) clearInterval(intervalId);
            intervalId = setTimeout(()=>{
                callback(this.ctx);
            }, delay);
        };
    }
    resizeChart(ctx) {
        if (window.innerWidth <= 442) {
            ctx.style.width = "300px";
            ctx.style.height = "300px";
        } else if (window.innerWidth <= 525) {
            ctx.style.width = "400px";
            ctx.style.height = "400px";
        } else {
            ctx.style.width = "500px";
            ctx.style.height = "500px";
        }
    // ctx.style='';
    // ctx.width=300;
    // ctx.height=300;
    // console.log(ctx);
    }
    generateInvestmentTable() {
        // console.log(this.tableInvestmentData);
        // console.log(this.chartMetadata.data.labels);
        // console.log(this.chartMetadata.data.datasets[0].data);
        // generating table
        let tr = document.createElement("tr");
        tr.className = "flex gap-[1rem]  text-center w-[20rem] p-[.2rem]";
        let srNo = document.createElement("th");
        srNo.innerText = "Sr.No.";
        srNo.className = "text-slate-800 ";
        tr.append(srNo);
        let thInvestment = document.createElement("th");
        thInvestment.innerText = "Investment";
        thInvestment.className = " text-slate-800  w-[7rem]";
        tr.append(thInvestment);
        let thInvestmentValue = document.createElement("th");
        thInvestmentValue.className = " text-slate-800 ";
        thInvestmentValue.innerText = "Investment Amount";
        tr.append(thInvestmentValue);
        this.tableInvestmentData.append(tr);
        let idx = 0;
        let interval = 0;
        this.chartMetadata.data.datasets[0].data.forEach((amountInvested)=>{
            setTimeout(()=>{
                let tr = document.createElement("tr");
                tr.className = `flex gap-[2rem] justify-center text-left ${this.stylesTable.border} p-[.5rem] w-[20rem]`;
                let srNo = document.createElement("th");
                srNo.innerText = idx + 1;
                srNo.className = " text-zinc-50";
                tr.append(srNo);
                let tdInvestment = document.createElement("td");
                tdInvestment.className = "investmentName text-zinc-50 w-[10rem]";
                tdInvestment.innerText = this.chartMetadata.data.labels[idx];
                tr.append(tdInvestment);
                let tdInvestmentValue = document.createElement("td");
                tdInvestmentValue.className = "  text-zinc-50";
                tdInvestmentValue.innerText = "\u20B9 " + amountInvested;
                tr.append(tdInvestmentValue);
                this.tableInvestmentData.append(tr);
                idx++;
                if (idx === this.chartMetadata.data.labels.length) // return ;     
                // drawing chart           
                setTimeout(()=>{
                    this.tableInvestmentData.classList.add("displayNone");
                    this.selectChartType.classList.remove("displayNone");
                    this.updateChartType("pie");
                }, 2000);
            }, interval);
            interval += 200;
        });
    }
    updateChartType(chartType) {
        if (this.chart) this.chart.destroy();
        setTimeout(()=>{
            this.chart = new Chart(this.ctx, {
                type: chartType,
                data: {
                    ...this.chartMetadata.data
                },
                options: {
                    ...this.chartMetadata.options
                }
            });
            this.resizeChart(this.ctx);
            setTimeout(()=>{
                anime({
                    targets: "#myChart",
                    scale: [
                        {
                            value: .7,
                            easing: "easeOutSine",
                            duration: 300
                        },
                        {
                            value: 1,
                            easing: "easeInOutQuad",
                            duration: 1500
                        }
                    ]
                });
            }, 100);
        }, 300);
    }
} // export default View;

//# sourceMappingURL=index.6b73f227.js.map
