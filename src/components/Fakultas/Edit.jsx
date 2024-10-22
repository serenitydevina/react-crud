import React, {useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export default function Edit(){
    const {id} = useParams();
    const navigate = useNavigate();
    const[nama, setNama] = useState("");
    const[error, setError] = useState(null);

    useEffect(() =>{
        axios
        .get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
        .then((response) => {
            setNama(response.data.result.nama);
        })
        .catch((error) =>{
            console.error("Error fetching data:",error);
            setError("Data tidak ditemukan");
        });
    },[id]);

    const handleChange = (e) => {
        setNama(e.target.value);
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios
        .patch(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`,{nama})
        .then((response) => {
            navigate("/fakultas");
        })
        .catch((error) =>{
            console.error("Error updating data: ", error);
            setError("Gagal mengupdate data");
        });
    };
    return(
        <div>
            <h2>Edit Fakultas</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className=" mb-3">
                    <label htmlFor="nama" className="form-label">Nama Fakultas</label>
                    <input
                    type="text"
                    className="form-control"
                    id="nama"
                    value={nama}
                    onChange={handleChange}
                    required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}