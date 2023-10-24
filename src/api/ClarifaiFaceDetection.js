import React, { useEffect, useState } from 'react';
import styles from '../api/FaceRecognition.module.css'
import '../App.css';

function ClarifaiFaceDetection(props) {
    const [faceBox,setFaceBox] = useState([])

    const returnClarifaiRequestOptions = (imageUrl) =>{
        const PAT = 'a8df18085aaa40bca9de7bf752b2cae6';
        // Specify the correct user_id/app_id pairings
        // Since you're making inferences outside your app's scope
        const USER_ID = 'tamirgino';       
        const APP_ID = 'smart-brain';
        // Change these to whatever model and image URL you want to use
        //const MODEL_ID = 'face-detection';
        const IMAGE_URL = imageUrl;

        //Setting up the Json we are going to send to Clarifai 
        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        return requestOptions
    }

    const calculateFaceLocation = (data) => {
        if(data.outputs[0].data.regions){
            setFaceBox([{}])
            const boundingBoxes = data.outputs[0].data.regions.map(region => {
            const clarifaiFace = region.region_info.bounding_box;
            const image = document.getElementById('input-image');
            const width = Number(image.width);
            const height = Number(image.height);
    
            return {
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - (clarifaiFace.right_col * width),
                bottomRow: height - (clarifaiFace.bottom_row * height)
            };
            });
            setFaceBox(boundingBoxes);
            }
        }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(props.imgUrl))
                const data = await  resp.json();
                calculateFaceLocation(data);
                //.catch(error => console.log('error', error));
            } catch (error) {
                console.error('Error:', error);
            }
        };
        if(props.imgUrl){
            fetchData();
        }
        
    }, [props.imgUrl]);

    
// console.log(faceBox)
    return (
            <div style={{position:'relative'}}>
                <img id='input-image' className={styles.image} alt='' src={props.imgUrl}/>
                {faceBox.map((box, index) => (
                <div
                    key={index}
                    className={styles.bounding_box}
                    style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                    }}
                ></div>
            ))}
                
            </div>

    );
}

export default ClarifaiFaceDetection;
