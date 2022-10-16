import { Button } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Webcam from 'react-webcam';
import { getImages } from '../api/image-search';
import { useEffectOnce } from '../hooks/use-effect-once';

const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: "user"
};

export default function Upload() {
    const params = useParams();
    const [images, setImages] = useState<string[]>([]);
    const [hideWebcam, setHideWebcam] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const [loading, setLoading] = useState(false);
    const capture = () => {
        const imageSrc = webcamRef.current!.getScreenshot();
        if (params.text && imageSrc) {
            setLoading(true);
            setHideWebcam(true);
            getImages(params.text, imageSrc)
                .then(images => {
                    setImages(images);
                    setLoading(false);
                })
                .catch(console.error);
        }
    };

    return <Container>{loading && <Spinner animation="border"></Spinner>}{!hideWebcam &&
        <div><Webcam
            audio={false}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={480}
            videoConstraints={videoConstraints}
        /><Button onClick={capture}>Capture image</Button></div>}{images.map((image, i) => <img key={i} src={image}></img>)}</Container>;
}
