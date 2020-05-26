chartIt();
    async function chartIt(){
    const data = await getData();
    const ctx = document.getElementById('chart3').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.xlabels,
            datasets: [
            {
                label: 'Number of Deaths by State',
                data: data.ydeaths,
                fill:false,
                backgroundColor: '#CD5C5C',
                hoverBackgroundColor: '#00FFFF',
                hoverBorderColor: '#000000',
                borderWidth: 2
            }
        ]
        },
        options: {
            title:{
                display:true,
                text:'Number of Deaths by State',
                fontSize: 30
            },
            legend:{
                display:false,
                position:'right',
            },
        }
    });
}
    async function getData(){
        const xlabels = [];
    const ydeaths = [];
        const response = await fetch('current.csv');
        const data = await response.text();
        const table = data.split('\n').slice(1);
        table.forEach(row => {
            const columns = row.split(',');
            const states = columns[0];
            xlabels.push(states);
            const deaths = columns[19];
            ydeaths.push(deaths);
            console.log(states, deaths);        
        });
        return{xlabels, ydeaths};
    }