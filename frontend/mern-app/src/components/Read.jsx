import React, { useEffect, useState } from 'react'
import { json, Link } from 'react-router-dom';

function Read() {

  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  async function getData(){
    try{
      const response = await fetch("http://localhost:5000");
      const result = await response.json();
      if(!response.ok){
        throw new Error(response.error || "Something Went Wrong");
      }
      setData(result);
    }
    catch(error){
      console.log(error)
      setError(error.message);
    }
  }

  const handleDelete = async (id) =>{
    try{
      const response = await fetch(`http://localhost:5000/${id}`,{
        method: "DELETE"
      })
      const result =  await response.json();
      if(!response.ok){
        throw new Error(response.error || "Unabel to delete the data !");
      }
      setError("Deleted Successfully !")
      setTimeout(()=>{
        setError("");
        getData();
      }, 1000)
    }
    catch(error){
      console.log(error)
      setError(error.message);
    }

  }


  useEffect(() => {
    getData();
  }, []);

  // console.log(data)

  return (
    <div className="container my-2">
      <h2 className="text-center">All Data !</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="row">
        {data?.map((elem) =>(
          <div key={elem._id} className="col-3">
            <div className="card" >
              <div className="card-body">
                <h5 className="card-title">{elem.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{elem.email}</h6>
                <p className="text-muted">{elem.age}</p>
                <a href="#" className="card-link" onClick={() => handleDelete(elem._id)}>Delete</a>
                <Link to={`/${elem._id}`} href="#" className="card-link">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Read