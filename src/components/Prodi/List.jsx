import React,{useEffect, useState} from "react";
import axios from"axios"
import {NavLink} from "react-router-dom"
import Swal from "sweetalert2";

export default function List(){
    const[prodi,setProdi] = useState([]);
    useEffect(()=>{
        axios.get('https://project-apiif-3-b.vercel.app/api/api/prodi')
        .then((response) =>{
            console.log(response.data.result)
            setProdi(response.data.result)
        })
        .catch((error) => {
            console.log('Error: ', error);
        })
    },[])

    const handleDelete  = (id, nama) =>{
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revart this! Prodi: ${nama}`,
            icon: "warning",
            showCancelButton:true, confirmButtonColor:"#3085d6", cancelButtonColor:"#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) =>{
            if(result.isConfirmed){
                axios
                .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
                .then((response) =>{
                    setProdi(prodi.filter((data) =>data.id !==id));
                    Swal.fire("Deleted!", "Your data has been deleted.", "success");
                })
                .catch((error) => {
                    console.error("Error deleting data", error);
                    Swal.fire(
                        "Error",
                        "There was an issue deleting the data",
                        "error"
                    );
                });
            }
        });
    }



    return(

        <>
        <h2>List Prodi</h2>
        <NavLink to="/prodi/create" className="btn btn-primary mb-3">
            Create
            </NavLink>

        <table className="table">
  <thead>
    <tr>
      <th scope="col">Prodi</th>
      <th scope="col">Fakultas</th>
      <th>#</th>
    </tr>
  </thead>
  <tbody>
    {
        prodi.map((data) =>(
            <tr key={data.id}>
                <td>{data.nama}</td>
                <td>{data.fakultas.nama}</td>
                <td>
                <div className="btn-group" role="group" aria-label="Action buttons">
                    <NavLink to={`/prodi/edit/${data.id}`} className='btn btn-warning'>
                    Edit
                    </NavLink>
                    <button onClick={() =>handleDelete(data.id, data.nama)} className="btn btn-danger"> 
                        Delete
                    </button>
                    </div>
                </td>
            </tr>
        ))
    }
     
  </tbody>
</table>
        </>
    )
}