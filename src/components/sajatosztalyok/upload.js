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
                bev1:props.anyag_nevesmeret,
                bev2:props.anyag_mennyiseg,
                bev3:props.anyag_ar,
                bev4:props.anyag_rendelo,
                bev5:props.anyag_kep,
                bev6:props.anyag_leiras
            }
            fetch('http://localhost:8080/uj_anyag_fel',{
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
                <button onClick={uploadFile}>Upload</button>
            </div>
        );
}

export default FileUpload;