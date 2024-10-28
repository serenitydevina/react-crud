import React,{useState, useEffect} from "react";
import axios from "axios";
// import { useEffect } from "react";

export default function CreateProdi(){
    const [namaProdi,setNamaProdi] = useState("");
    const[fakultasId, setFakultasId] = useState("");
    const[fakultasList, setFakultasList] = useState([]);
    const[error, setError] = useState("");
    const[success, setSuccess] = useState("");
    const token = localStorage.getItem("authToken");

    useEffect(() =>{
        const fetchFakultas = async() => {

            try{
                const response = await axios.get(
                    "https://project-apiif-3-b.vercel.app/api/api/fakultas"
                );
                setFakultasList(response.data.result);
            }catch(error){
                setError("Failed to fetch fakultas data");
            }
        };

        fetchFakultas();
    },[]);
    
    //Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async(e) =>{
        e.preventDefault(); //mencegah reload halaman setelah form disubmit
        setError(""); //Reset pesan error sebelum proses
        setSuccess(""); 

        if(namaProdi.trim()===""|| fakultasId.trim()===""){
            setError("Nama Prodi dan Fakultas are required");
            return;
        }

        try{
            const response = await axios.post(
                "https://project-apiif-3-b.vercel.app/api/api/prodi",
                {
                    nama: namaProdi,
                    fakultas_id : fakultasId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json'
                    }
                }
            );

            if(response.status===201){
                setSuccess("Prodi created successfully!");
                setNamaProdi("");
                setFakultasId("");
            }else{
                setError("Failed to create prodi");
            }
        }catch(error){
            setError("An error occured while creating fakultas");
        }
        };

        return(
            <div className="container mt-5">
            <h2 className="mb-4">Create Fakultas</h2>

            {/*Jika ada pesan error, tampilkan dalam alert bootstrap*/}
            {error &&<div className="alert alert-danger">{error}</div>}

            {success && <div className="alert alert-success">{success}</div>}

            {/*Form untuk mengisi nama fakultas*/}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaProdi" className="form-label">
                        Nama Prodi
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="namaProdi"
                    value={namaProdi}
                    onChange={(e)=>setNamaProdi(e.target.value)}
                    placeholder="Enter Prodi Name"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Fakultas</label>
                    <select
                    className="form-select"
                    id="fakultasId"
                    value={fakultasId}
                    onChange={(e) => setFakultasId(e.target.value)}
                    >
                        <option value="">Select Fakultas</option>
                        {fakultasList.map((fakultas)=>(
                            <option key={fakultas.id} value={fakultas.id}>
                                {fakultas.nama}
                            </option>
                        ))}
                    </select>
                    </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
        );
    }