var myApp = angular.module("myApp", []);
myApp.controller("myController", function ($scope, $http, $q, $filter) {
  $scope.data = {};
  $scope.years = ["2023", "2022"]; // Manually add to this for now.
  $scope.selectedYear = "2023";

  $scope.init = function () {
    getData();
    // generateChart();
  };

  $scope.loadFile = () => {
    getData();
  };

  getData = () => {
    var file = "data/stats.json";
    var year = $scope.selectedYear;

    $http.get(file).then(function (response) {
      var chosenYear = response.data[year];
      const keys = Object.keys(chosenYear);
      const months = Object.values(chosenYear);
      $scope.data = months;

      generateChart(keys, months);
    });
  };

  generateChart = (keys, values) => {
    // Chart.register(ChartDataLabels);
    // Change default options for ALL charts
    // Chart.defaults.set('plugins.datalabels', {
    //     color: '#FE777B'
    // });

    const options = {
      plugins: {
        autocolors: false,
        datalabels: {
          color: "#36A2EB",
        },
        // annotation: {
        //     annotations: {
        //         line1: {
        //             type: 'line',
        //             yMin: 60,
        //             yMax: 60,
        //             borderColor: 'rgb(255, 99, 132)',
        //             borderWidth: 2,
        //         }
        //     }
        // }
      },
    };

    var positionChange = values.map((v) => v.positionChange);
    var activeContributors = values.map((v) => v.activeContributors);
    var activeContributorsChange = values.map(
      (v) => v.activeContributorsChange
    );
    var totalCommunity = values.map((v) => v.totalCommunity);
    var totalCommunityChange = values.map((v) => v.totalCommunityChange);
    var position = values.map((v) => v.position);

    const config = {
      type: "line",
      data: {
        labels: keys,
        datasets: [
          {
            label: "Position Change",
            data: positionChange,
            fill: false,
            borderColor: "red",
            tension: 0.1,
            datalabels: {
              color: "#FFCE56",
            },
          },
          {
            label: "Active Contributors",
            data: activeContributors,
            fill: false,
            borderColor: "green",
            tension: 0.1,
          },
          {
            label: "Active Contributors Change",
            data: activeContributorsChange,
            fill: false,
            borderColor: "blue",
            tension: 0.1,
          },
          {
            label: "Total Community",
            data: totalCommunity,
            fill: false,
            borderColor: "yellow",
            tension: 0.1,
          },
          {
            label: "Total Community Change",
            data: totalCommunityChange,
            fill: false,
            borderColor: "orange",
            tension: 0.1,
          },
          {
            label: "Position",
            data: position,
            fill: false,
            borderColor: "brown",
            tension: 0.1,
          },
        ],
      },
      options,
    };

    // $("#myChart").empty();

    let ctx = $("#myChart");

    let lineGraph = new Chart(ctx, config);
    lineGraph.update();
  };

  $scope.init();
});
