var timeout = setTimeout("location.reload(true);",300000);

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("https://api.coinmarketcap.com/v1/ticker/?limit=10",  function(error, data) {

    x.domain(data.map(function(d) { return d.name; }));
    y.domain([0, d3.max(data, function(d) { return d.price_usd; })]);

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.price_usd); })
        .attr("height", function(d) { return height - y(d.price_usd); })
        .attr("width", x.rangeBand());

//        var bar = chart.selectAll("g")
//        bar.append("text")
//        //            .attr("x", x.rangeBand() / 2)
//        //            .attr("y", function(d) { return y(d.price_usd) + 3; })
//        //            .attr("dy", ".75em")
//        //            .text(function(d) { return d.price_usd; });
//            .attr("x", x.rangeBand() / 2 )
//            .attr("y", function(d) { return y(d.price_usd) -10; })
//            .attr("dy", ".75em")
//            .text(function(d) { return d.price_usd; });

    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(0)")
        .attr("x" , 80)
        .attr("y", -15)
        .attr("dy", ".90em")
        .style("text-anchor", "end")
        .text("Exchange Rate in USD");


});