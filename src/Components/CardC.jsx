import React, {useState, useEffect} from "react";


function CardC(){
    const [Loading, setLoading] = useState(true)
    const [Cases, setCases] = useState(null)
    useEffect(() =>{
        const runCall = async () => {
            let apiValue = await fetchData();
            
            // Sweden is at index 243 in the total list
            const swedenData = apiValue.split('\n').slice(0).map
            (line => (line.split(',')))[243].slice(4);
            
            const caseData = [];
         
            for (let i = 0; i < swedenData.length; i++){
                const tempRow = {};
                tempRow.Cases =  parseInt(swedenData[i]);
                caseData.push(tempRow.Cases);
            }

            setCases(caseData);
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
        
        runCall();

    }, []) 

    const nrOfCases = [];

    if (Cases?.length > 0) {
        nrOfCases.push(Cases[Cases.length - 1])
    }

    return (
      <div className="card">
          {Loading ?
            <div>lodaing....</div> : 
                <p>Total cases since first data point {nrOfCases}</p>  
          }  
      </div>
    )
    
}

export default CardC;

