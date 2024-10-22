import React, {useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export default function Edit(){
    const {id} = useParams();
    const navigate = useNavigate();
    const[nama, setNama] = useState("");
    const[fakultas, setFakultas] = useState("");
    const[listFakultas, setListFakultas] = useState([]);
    const[error, setError] = useState(null);

    useEffect(() => {
        axios
        .get(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
        .then((response) =>{
            setNama(response.data.result.nama);
            setFakultas(response.data.result.fakultas.id);
        })
        .catch((error) =>{
            console.error("Error fetching data:", error);
            setError("Data tidak ditemukan");
        });

        axios
        .get("https://project-apiif-3-b.vercel.app/api/api/fakultas")
        .then((response) =>{
            setListFakultas(response.data.result);
        })
        .catch((error) => {
            console.error("Error fetching fakultas data", error);
        });
    },[id]);
    const handleChange =(e) =>{
        setNama(e.target.value);
    };

    const handleFakultasChange = (e) => {
        setFakultas(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .patch(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`,
            {
                nama, 
                fakultas_id: fakultas,
            })
        .then((response) => {
            navigate('/prodi');
        })
        .catch((error) => {
            console.error("Error updating data:", error);
            setError("Gagal mengupdate data"); 
        });
    };
    return(
        <div>
            <h2>Edit Program Studi</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nama" className="form-label">
                        Nama Program Studi
                    </label>
                    <input
                    type="text" className="form-control" id="nama" value={nama}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fakultas" className="form-label">
                        Nama Fakultas
                    </label>
                    <select
                    className="form-select" id="fakultas" value={fakultas}
                    onChange={handleFakultasChange}
                    required
                    >
                    <option value="">Pilih Fakultas</option>
                    {listFakultas.map((fakultas) =>(
                        <option key={fakultas.id} value={fakultas.id}>
                            {fakultas.nama}
                        </option>
                    )
                    )}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>{""}
            </form>
        </div>
    )
}