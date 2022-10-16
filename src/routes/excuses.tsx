import { Button } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom'

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

    const locationList = [
        'bus stop',
        'hospital',
        'hospital',
        'hostpial',
        'bed',
        'hospital',
        'full parking lot',
        'hospital',
        'school',
        'traffic',
        'broken skateboard',
        'family vacation',
        'bed',
        'meditation',
        'dog ate my homework',
        'dark room',
        'hospital',
        'hospital',
        'cat',
        'clock',
        'hostpial',
        'positive covid test'
    ]

    const [resLocationList, setResLocationList] = useState(() => locationList.slice(0, 4));

    function getExcuses(n: number) {
        if (i + n > excuseList.length) {
            setI(0);
        } else {
            setI(i + n);
        }
        setResLocationList(locationList.slice(i, i + n));
        return excuseList.slice(i, i + n);
    }

    const [resList, setResList] = useState(() => getExcuses(4));

    function refreshResults() {
        setResList(getExcuses(4));
    }

    function select(text: string, realtext: string) {
        navigate({pathname: `/upload/${window.encodeURIComponent(text)}`, search: createSearchParams({
            realtext
        }).toString()})
    }

    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {resList.map((text, i) => <Button key={i} onClick={() => select(resLocationList[i], text)}>{text}</Button>)}
                <Button variant="outlined" onClick={refreshResults}>New Results</Button>
                <Button variant="outlined" onClick={() => navigate(`/previous/all`)}>Previous Excuses</Button>
            </div>
        </Container>

    )

}