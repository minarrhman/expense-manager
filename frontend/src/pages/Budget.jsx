import {useState, useEffect} from 'react';
import API from '../services/api';
import BudgetCard from '../Components/BudgetCard';


function Budget() {

  const [limits, setLimits] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    fetchLimits();
  },[]);

  const fetchLimits = async () =>{
    try{
      const res = await API.get('api/category-limits/');
      console.log(res)
      setLimits(res.data.results)
      console.log(res.data.results)
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false);
    }
  }



  return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Budget Management
            </h1>

            {
                loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            limits.map((item) => (
                                <BudgetCard
                                    key={item.id}
                                    item={item}
                                />
                            ))
                        }

                    </div>
                )
            }

        </div>
    );
};


export default Budget
