import { Button, CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Webcam from 'react-webcam';
export default function Previous() {
    const params = useParams();
    const navigate = useNavigate();

    const images: string[] = window.localStorage.getItem(`${params.prev}`) ? JSON.parse(window.localStorage.getItem(`${params.prev}`) as string) : [];

    if (params.prev === 'all')
        return <Container>{images.map((image, i) => <Button key={i} onClick={() => navigate(`/previous/${encodeURIComponent(image)}`)}>{image}</Button>)}</Container>
    else
        return <Container>{images.map((image, i) => <img key={i} src={image}></img>)}</Container>;
}
