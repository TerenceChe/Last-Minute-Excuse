import { useState } from 'react';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom'

export default function Upload() {
    const params = useParams();

    return <Container>{params.text}</Container>;
}
