import { Button } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Excuses() {
    const navigate = useNavigate();
    const [i, setI] = useState(0);

    const needExcusesForList = [
        "missed assignment",
        "missed class",
        "missed meeting",
        "missed hangout",
        "not practicing piano",
        "no girlfriend",
        "no personal project",
        "no hobbies outside of league"
    ]

    const excuseList = [
        'busses skipped my stop and were delayed',
        'family emergency',
        'broke neck',
        'I was in the hospital',
        'lost voice',
        'broke ankle',
        'no parking available',
        'broke arm',
        'too busy with school',
        'traffic was bad',
        'injured skateboarding',
        'family vacation',
        'sick',
        'focusing on myself',
        'dog ate homework',
        'pulled an all nighter',
        'broke leg',
        'medical emergency',
        'cat ate homework',
        'dont have time',
        'have chlamydia',
        'caught covid'
    ]

    function getExcuses(n: number) {
        if (i + n > excuseList.length) {
            setI(0);
        } else {
            setI(i + n);
        }
        return excuseList.slice(i, i + n);
    }

    const [resList, setResList] = useState(() => getExcuses(4));

    function refreshResults() {
        setResList(getExcuses(4));
    }

    function select(text: string) {
        navigate(`/upload/${window.encodeURIComponent(text)}`)
    }

    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {resList.map((text, i) => <Button key={i} onClick={() => select(text)}>{text}</Button>)}
                <Button variant="outlined" onClick={refreshResults}>New Results</Button>
            </div>
        </Container>

    )

}