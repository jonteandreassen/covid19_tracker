import React, {useState, useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from 'recharts';

function Graph(){
    const [data, setData] = useState(null)
    const [Loading, setLoading] = useState(true)

    useEffect(() =>{
        const runCall = async () => {
            let apiValue = await fetchData();
            let apiDeathValue = await fetchDeathsData();
            //console.log(apiValue); // debugg

            // header Province/State,Country/Region,Lat,Long,1/22/20
            const date = apiValue.split('\n').slice(0).map
            (line => (line.split(',')))[0].slice(4); // slice out date 
            //console.log(date); // debugg
            
            const swedenData = apiValue.split('\n').slice(0).map
            (line => (line.split(',')))[243].slice(4);
            //console.log(swedenData); // debugg

            const swedenDeathData = apiDeathValue.split('\n').slice(0).map
            (line => (line.split(',')))[243].slice(4);
            //console.log(swedenDeathData); // debugg
            
            const graphData = [];

            for (let i = 0; i < swedenData.length; i++){
                const tempRow = {};
                tempRow.date = date[i];
                tempRow.Cases =  parseInt(swedenData[i]);
                graphData.push(tempRow);
            }
            //console.log(graphData);
            for (let i = 0; i < swedenDeathData.length; i++){
                const tempRow2 = {};
                tempRow2.date = date[i];
                tempRow2.Deaths =  parseInt(swedenDeathData[i]);
                graphData.push(tempRow2);
            }
            
            // Sort date 
            graphData.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
              });
            //console.log(graphData); // debugg
            setData(graphData);
            setLoading(false);
            return null;

        }
        const fetchData = async () =>{
            const requestOption = {
                method: "GET",
                redirect: "follow"
            }

            const apiUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`

            try {
                const response = await fetch(apiUrl, requestOption);
                return response.ok ? response.text() : null
            } catch (error) {
                console.log(error);
                return null;
            }
        }
        
        const fetchDeathsData = async () => {
            const requestOption = {
                method: "GET",
                redirect: "follow"
            }

            const apiUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv`

            try {
                const response = await fetch(apiUrl, requestOption);
                return response.ok ? response.text() : null
            } catch (error) {
                console.log(error);
                return null;
            }
        }
        runCall();

    }, []) 


    return (
      <div className ="graph">
         {Loading ?
      <div>lodaing....</div> : 
          <LineChart
            width={1200}
            height={350}
            data={data}
            syncId="date"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical="" horizontal="true" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Cases" stroke="#8fb869" fill="#8fb869" activeDot={{ r: 6 }}/>
            <Brush dataKey="date" />
          </LineChart>
        }

    

          <LineChart
            width={1200}
            height={350}
            data={data}
            syncId="date"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical="" horizontal="true" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Deaths" stroke="#eba263" fill="#eba263" activeDot={{ r: 6 }}/>
            <Brush dataKey="date" />
          </LineChart>

      </div>
    )
    
}

export default Graph;

