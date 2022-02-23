import axios from 'axios';
import React,{useState} from 'react'

function FileUpload(props) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData
            );
            console.log(res);
            let bemenet={
                bev1:props.hos_id,
                bev2:props.hos_nev,
                bev3:props.role_id,
                bev4:props.hos_leiras,
                bev5:props.kep,
            }
            fetch('http://localhost:8080/uj_hos_fel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
    )
    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)

})
        } catch (ex) {
            console.log(ex);
        }
    };

        return (
            <div className="App">
                <input type="file" onChange={saveFile} />
                <button onClick={uploadFile}>Kiválasztott kép feltöltése</button>
            </div>
        );
}

export default FileUpload;