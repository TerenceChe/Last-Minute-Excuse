import { useState } from 'react';
import { redirect } from 'react-router-dom';

export default function Excuses() {
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
    const [selected, setSelected] = useState(NaN);

    function refreshResults() {
        setResList(getExcuses(4));
    }

    async function submit() {
        if (isNaN(selected)) {
            // dont do anything
        }
        else {
            console.log(selected)
        }
    }

    function select(index: number) {
        setSelected(index);
    }


    return (
        <div>
            <div id="excuse" onClick={() => select(0)}>
                <img></img>
                <h4>{resList[0]}</h4>
            </div>
            <div id="excuse" onClick={() => select(1)}>
                <img></img>
                <h4>{resList[1]}</h4>
            </div>
            <div id="excuse" onClick={() => select(2)}>
                <img></img>
                <h4>{resList[2]}</h4>
            </div>
            <div id="excuse" onClick={() => select(3)}>
                <img></img>
                <h4>{resList[3]}</h4>
            </div>
            <button onClick={refreshResults}>New Results</button>
            <button onClick={submit}>Submit</button>
        </div>
    )

}