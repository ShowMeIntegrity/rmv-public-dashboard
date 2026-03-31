window.buildChartOption = function (data) {
  // Map your sheet columns → chart data
  const rmv = data.rmv;
  const division    = rmv.map(d => d["Division"]);
  // const checkedSigs = rmv.map(d => d["Checked Sigs"]);
  const t1Valid     = rmv.map(d => d["T1-Validated"]);
  // const collectGoal = rmv.map(d => d["Collection Goal"]);
  const minValid    = rmv.map(d => d["Min Valid Needed"]);

  const cds         = division.slice(0,8);
  // const realCollect = checkedSigs.slice(0,8);
  const realValid   = t1Valid.slice(0,8);
  // const goalCollect = collectGoal.slice(0,8);
  const goalValid   = minValid.slice(0,8);

  const diffValid   = subtractVector(goalValid, realValid);
  // const diffCollect = subtractVector(goalCollect, realCollect);


  return {
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        let total = 0;

        params.forEach(p => {
          total += p.value;
        });

        const pct = total ? ((params[0].value / total) * 100).toFixed(1) : 0;

        let html = `<strong>${params[0].axisValue} (${pct}%)</strong><br/>`;
        
        params.forEach(p => {
          
          html += `
            ${p.marker} ${p.seriesName}
            <span style="float:right; padding-left:24px"><strong>${p.value.toLocaleString()}</strong></span><br/>
          `;
        });

        return html;
      }
    },

    title: {
      subtext: "We need to qualify in 6 out of 8 congressional districts.",
      subtextStyle: {
        color: "#636367",
        fontSize: 24
      },
      text: "Valid Signatures by Congressional District",
      textStyle: {
        color: "#212126",
        fontSize: 36
      }
      
    },

    legend: {
      bottom: "2%",
      itemGap: 48,
      padding: [24, 6, 0, 6],
      textStyle: {
        fontSize: 18,
        fontWeight: "bold"
      }
    },

    grid: {
      top: "21%",
      bottom: "19%"
    },

    xAxis: {
      axisLabel: {
        fontSize: 18,
        fontWeight: "bold"
      },
      data: cds,
      name: "Congressional District",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 24,
        fontWeight: "bolder",
        padding: 12
      },
      type: "category"
    },

    yAxis: {
      axisLabel: {
        fontSize: 18,
        fontWeight: "bold"
      },
      name: "Number of Signatures",
      nameLocation: "center",
      nameTextStyle: {
        fontSize: 24,
        fontWeight: "bolder",
        padding: 12
      },
      type: "value"
    },

    series: [
      // Collected Numbers
    //   {
    //     name:  'Collected Sigs',
    //     type:  'bar',
    //     stack: 'collected',
    //     data:  realCollect,
    //     color: "#040449"
    //   },
    //   {
    //     name: 'Sig Collection Goal',
    //     type: 'bar',
    //     stack: 'collected',
    //     data: diffCollect,
    //     color: "#a2bad2"
    //   },

      // Valid Numbers
      {
        name:  'Valid Sigs',
        type:  'bar',
        stack: 'valid',
        data:  realValid,
        color: "#040449",
        itemStyle: {
          color: function (params) {
            if (params.dataIndex === 5 | params.dataIndex === 7) {
              return "#535F8E";
            }
            return "#040449";
          }
        }
      },

      {
        name: 'Minimum Valid Sigs Remaining',
        type: 'bar',
        stack: 'valid',
        data: diffValid,
        color: "#a2bad2",
        itemStyle: {
          color: function (params) {
            if (params.dataIndex === 5 | params.dataIndex === 7) {
              return "#DDE5EF";
            }
            return "#a2bad2";
          }
        }
      },
    ]
  };
}

function subtractVector(a,b) {
    return a.map((e,i) => e - b[i]);
}