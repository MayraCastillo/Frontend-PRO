import { FormGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import { handleInputChange } from 'react-select/src/utils';

const useStyles = makeStyles({
    root: {
      width: '50%',
    },
    none: {
        display: 'none',
    }
});

export default function Probando() {

    const classes = useStyles();
    const [image, setImage] = useState(null);
    const fileUpload = require('fuctbase64');
    const [code, setCode] = useState("hola");

    //Codifica la imagen usando fuctbase64 
    function changeListener(event){
        fileUpload(event)
        .then((data) => {
                console.log("base64 :",data.base64);
                //this.processImage(data.base64);
        })
     }

     //Codifica la imagen usando canvas
    function convertImgToBase64(){
        var img = document.getElementById('testImage');
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var canvas = document.createElement('CANVAS');
            var context = canvas.getContext('2d');
            canvas.height = this.height;
            canvas.width = this.width;
            context.drawImage(this,0,0);
            var dataURL = canvas.toDataURL('image/jpeg');
            document.getElementById('result').value = dataURL;
        };
    }


    function convertImgToBase64v2(){
        var filesSelected = document.getElementById("test").files;
                if (filesSelected.length > 0) {
                    var fileToLoad = filesSelected[0];
                    var fileReader = new FileReader();
                    fileReader.onload = function(fileLoadedEvent) {
                        var base64value = fileLoadedEvent.target.result;
                        console.log(base64value);
                        document.getElementById('result').value = base64value;
                    };
                    fileReader.readAsDataURL(fileToLoad);
        };
    }

    function convertBase64ToImg(){
        document.getElementById('previewImage').setAttribute('src', document.getElementById('result').value);
    }


    function handleChangeFile(event){
        setImage(URL.createObjectURL(event.target.files[0]))
    }

	return (
		<>
			<h1>Aqui probando a ver si funciona :v</h1>
            <FormGroup>
                <div className={classes.root}>
                    <input id="test" type="file" onChange={convertImgToBase64v2} />
                    {image && <img id="testImage" src={image} alt="image" />}
                    <br/>
                    <textarea id="result" rows="5" cols="151"></textarea>
                    <br/>
                    <button onClick={convertBase64ToImg}>Convertir Base64 a img</button>
                    <img id="previewImage" src="" alt="image" />
                </div>
            </FormGroup>
		</>
	);
}
