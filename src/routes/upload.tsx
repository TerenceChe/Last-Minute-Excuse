import { Container } from '@mui/system';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { getImages } from '../api/image-search';
import { useEffectOnce } from '../hooks/use-effect-once';

export default function Upload() {
    const params = useParams();
    const [images, setImages] = useState<string[]>([]);

    useEffectOnce(() => {
        if (params.text) {
            getImages(params.text).then(images => setImages(images));
        }
    });

    return <Container>{images.map((image, i) => <img key={i} src={image}></img>)}</Container>;
}
