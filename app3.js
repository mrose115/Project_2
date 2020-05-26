var tbody = d3.select("tbody");

d3.csv("daily.csv").then(function(data) {
    console.log(data);

    data.forEach(function(covid_case) {

    console.log(covid_case);
        var row = tbody.append("tr");
    Object.entries(covid_case).forEach(function([key, value]) {
        console.log(key, value);
        var cell = row.append("td");
    cell.text(value);
     });
});


var filter = d3.select("#filter-btn");

filter.on("click", function() {

    tbody.html("");

    var inputField = d3.select("#state");
    var inputValue = inputField.property("value");

    console.log(inputValue);

    var filteredData = data.filter(covid_case => covid_case.date === inputValue ||
                                                        covid_case.state === inputValue ||
                                                        covid_case.positive === inputValue ||
                                                        covid_case.negative === inputValue ||
                                                        covid_case.pending === inputValue) ||
                                                        covid_case.hospitalizedCurrently === inputValue ||
                                                        covid_case.recovered === inputValue ||
                                                        covid_case.deaths === inputValue;
    console.log(filteredData);

    filteredData.forEach(function(selections) {

        console.log(selections);

        var row = tbody.append("tr");
        
        Object.entries(selections).forEach(function([key, value]) {
            console.log(key, value);

            var cell = row.append("td");
            cell.text(value);
        });
    });
});
});