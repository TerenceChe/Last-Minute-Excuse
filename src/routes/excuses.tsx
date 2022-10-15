import { Button } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function Excuses() {
    const navigate = useNavigate();

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
        "dont have time",
        "focusing on myself",
        "too busy with school",
        "family emergency",
        "traffic was bad",
        "busses skipped my stop and were delayed",
        "no parking available",
        "I was in the hospital",
        "dog ate homework",
        "cat ate homework",
        "medical emergency",
        "injured skateboarding",
        "sick",
        "lost voice",
        "broke arm",
        "broke leg",
        "broke neck",
        "broke ankle",
        "caught covid",
        "have chlamydia",
        "pulled an all nighter",
        "family vacation",
    ]

    function getExcuses(n: number) {
        const shuffled = excuseList.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    const [resList, setResList] = useState(getExcuses(4));

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