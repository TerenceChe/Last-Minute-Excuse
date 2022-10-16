import { Button, CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Webcam from 'react-webcam';
import { getImages } from '../api/image-search';
import { useEffectOnce } from '../hooks/use-effect-once';

const videoConstraints = {
    width: 480,
    height: 360,
    facingMode: "user"
};

export default function Upload() {
    const navigate = useNavigate();
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
                    const all = window.localStorage.getItem('all') ? JSON.parse(window.localStorage.getItem('all') as string) : []
                    all.push(params.text);

                    window.localStorage.setItem('all', JSON.stringify(all));
                    window.localStorage.setItem(params.text!, JSON.stringify(images));
                })
                .catch(console.error);
        }
    };

    return <Container>{loading && <CircularProgress></CircularProgress>}{!hideWebcam &&
        <div><Webcam
            audio={false}
            height={360}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={480}
            videoConstraints={videoConstraints}
        /><Button onClick={capture}>Capture image</Button></div>}{images.map((image, i) => <img key={i} src={image}></img>)}
            <Button onClick={() => navigate(`/excuses`)}>Go back</Button>
        </Container>;
}
