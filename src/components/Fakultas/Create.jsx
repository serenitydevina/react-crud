import React,{useState} from "react";
import axios from "axios";

export default function CreateFakultas(){
    //inisialisasi satte untuk menyimpan nama fakultas
    const [namaFakultas, setNamaFakultas] = useState("");

    //inisialisasi state untuk menyimpan pesan error
    const [error, setError] = useState("");

    //inisialisasi state untuk menyimpan pesan sukses
    const [success,setSuccess] = useState("");

    //Fungsi yang akan dijalankan saat form disubmit
    const handleSubmit = async(e) =>{
        e.preventDefault(); //mencegah reload halaman setelah form disubmit
        setError(""); //Reset pesan error sebelum proses
        setSuccess(""); 
        
        //Jika nama fakultas kosong maka tampilkan pesan error
        if(namaFakultas.trim()===""){
            setError("Nama Fakultas is required"); //set pesan error jika input kosong
            return; // stop eksekusi fungsi jika input tidak valid
        }

        try{
            //Melakukan HTTP POST request untuk menyimpan data fakultas
            const response= await axios.post(
                "https://project-apiif-3-b.vercel.app/api/api/fakultas", //Endpoint API yang dituju
                {
                    nama: namaFakultas,
                }
            );

            if(response.status ===201){
                setSuccess("Fakultas created successfully!");
                setNamaFakultas("");
            }else{
                setError("Failed to create fakultas");
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
                    <label htmlFor="namaFakultas" className="form-label">
                        Nama Fakultas
                    </label>

                    <input
                    type="text"
                    className="form-control"
                    id="namaFakultas"
                    value={namaFakultas}
                    onChange={(e)=>setNamaFakultas(e.target.value)}
                    placeholder="Enter Fakultas Name"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>

    );
}
