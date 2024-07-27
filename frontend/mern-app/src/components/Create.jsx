import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Create() {

  const [name, setName] = useState("") 
  const [email, setEmail] = useState("") 
  const [age, setAge] = useState(0); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // console.log(name,email,age);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const addUser =  { name, email, age};
    
    const response = await fetch("http://localhost:5000",{
      method: "POST",
      body: JSON.stringify(addUser),
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
      console.log(result)
      setError("")
      setName("");
      setEmail("");
      setAge("");
      navigate("/all")
    }


  }


  return (
    <div>
      <h1>Enter the Data </h1>
      {
        error && <div className="alert alert-danger">{error}</div>
      }
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Create