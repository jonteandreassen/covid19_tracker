import React, {useState, useEffect} from "react";


function CardD(){
    const [Loading, setLoading] = useState(true)
    const [Deaths, setDeaths] = useState(null)
    useEffect(() =>{
        const runCall = async () => {
            let apiValue = await fetchDeathsData();

            // Sweden is at index 243 in the total list
            const swedenDData = apiValue.split('\n').slice(0).map
            (line => (line.split(',')))[243].slice(4);
            
            const dData = [];
            for (let i = 0; i < swedenDData.length; i++){
                const tempRow2 = {};
                tempRow2.Deaths =  parseInt(swedenDData[i]);
                dData.push(tempRow2.Deaths);
            }
            setDeaths(dData);
            setLoading(false);
            return null;
            

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
    const sum = [];
    if (Deaths?.length > 0) {
        sum.push(Deaths[Deaths.length - 1])
    }

    //console.log(sum);
    return (
      <div className="card">
          {Loading ?
            <div>lodaing....</div> : 
                <p>Total deaths since first data point {sum}</p>   
          }
      </div>
    )
    
}

export default CardD;

