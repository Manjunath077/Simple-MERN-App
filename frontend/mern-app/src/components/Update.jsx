import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'

function Update() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age,setAge] = useState(0)
  const [error, setError] = useState("")
  const navigate = useNavigate();

  // to get the id of the user from the url in the search 
  const {id} = useParams();

  //to get the single user data 
  const getSingleUser = async () =>{
    try{
      const response = await fetch(`http://localhost:5000/${id}`)
      const result =  await response.json();
      if(!response.ok){
        throw new Error(response.error || "Unabel to edit the data !");
      }
      setError("");
      console.log("user data :" ,result )
      setName(result.name)
      setEmail(result.email)
      setAge(result.age)
    }
    catch(error){
      console.log(error)
      setError(error.message);
    }
  }

  // send the uodated data to the backend 
  const handleUpdate = async (e)=>{
    e.preventDefault();

    const updatedUser =  { name, email, age};
    
    const response = await fetch(`http://localhost:5000/${id}`,{
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers:{
        "Content-Type" : "application/json",
      }
    })

    const result = await response.json();

    if(!response.ok){
      console.log(result.error);
      setError(result.error)
    }
    if(response.ok){
      setError("");
      navigate("/all")
    }

  }

  useEffect(() =>{
    getSingleUser();
  },[])




  return (
    <div>
      <h1>Edit the Data  </h1>
      {
        error && <div className="alert alert-danger">{error}</div>
      }
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input type="text" className="form-control" id="exampleInputName" value={name} onChange={(e)=> setName(e.target.value)}/>
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">Email </label>
          <input type="email" className="form-control" id="exampleInputEmail" value={email} onChange={(e)=> setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAge" className="form-label">Age</label>
          <input type="number" className="form-control" id="exampleInputAge" value={age} onChange={(e)=>setAge(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Edit</button>
      </form>
    </div>
  )
}

export default Update