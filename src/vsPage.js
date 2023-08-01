import React, { useRef, useEffect, useState } from 'react';
import BigItem from './bigItem';

const oneSizeList = (elements) => {
    var list = [];
    for (var i = 0; i < elements.length; i++) {
        list.push([elements[i]]);
    }
    return list;
}

const mergeSort = (setState, initialArray, x, y, result, couple, i, j, leftRef, rightRef, setChoice, choice, props) => {
    setState(initialArray, x, y, result, couple, i, j);

    var left = initialArray[x];
    var right = initialArray[y];

    if (left !== undefined && right !== undefined) {
        if (i < left.length && j < right.length) {
            if (leftRef.current) {
                leftRef.current.updateName(left[i].name);
                leftRef.current.updateIcon(left[i].icon);
            }

            if (rightRef.current) {
                rightRef.current.updateName(right[j].name);
                rightRef.current.updateIcon(right[j].icon);
            }
        }
        else {
            let sort = couple;
            if (i < left.length) {
                sort = sort.concat(left.slice(i));
            }
            else if (j < right.length) {
                sort = sort.concat(right.slice(j));
            }
            result.push(sort)
            setState(initialArray, x + 2, y + 2, result, [], 0, 0);
            setChoice(choice + 1);
        }
    }
    else {
        if (left !== undefined) {
            result.push(left);
        }
        if (right !== undefined) {
            result.push(right);
        }
        if (result.length !== 1) {
            setState(result, 0, 1, [], [], 0, 0);
            setChoice(choice + 1);
        }
        else {
            props.onSortFinished(result[0]);
            props.onPageChange(2);
        }
    }
}

function VsPage(props) {
    const elements = props.items;

    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [initialArrayState, setInitialArrayState] = useState("none");
    const [xState, setXState] = useState("none");
    const [yState, setYState] = useState("none");
    const [resultState, setResultState] = useState();
    const [coupleState, setCoupleState] = useState();
    const [iState, setIState] = useState("none");
    const [jState, setJState] = useState("none");
    const [choiceState, setChoiceState] = useState(0);

    useEffect(() => {
        var list = oneSizeList(elements);
        mergeSort(setState, list, 0, 1, [], [], 0, 0, leftRef, rightRef, setChoiceState, choiceState, props);
    }, []);

    useEffect(() => {
        if (choiceState !== 0) {
            mergeSort(setState, initialArrayState, xState, yState, resultState, coupleState, iState, jState, leftRef, rightRef, setChoiceState, choiceState, props)
        }
    }, [choiceState]);

    const setState = (initialArray, x, y, result, couple, i, j) => {
        setInitialArrayState(initialArray);
        setXState(x);
        setYState(y);
        setResultState(result);
        setCoupleState(couple);
        setIState(i);
        setJState(j);
    }

    const handleClickLeft = () => {
        const updatedCouple = [...coupleState, initialArrayState[xState][iState]];
        setCoupleState(updatedCouple);
        setIState(iState + 1);
        setChoiceState(choiceState + 1);
    }

    const handleClickRight = () => {
        const updatedCouple = [...coupleState, initialArrayState[yState][jState]];
        setCoupleState(updatedCouple);
        setJState(jState + 1);
        setChoiceState(choiceState + 1);
    }

    const handleKeyDownLeft = (event) => {
        if (event.key === 'Enter') {
            handleClickLeft();
        }
    }

    const handleKeyDownRight = (event) => {
        if (event.key === 'Enter') {
            handleClickRight();
        }
    }

    return (
        <div className="vs-page" >
            <div className="background-container" style={{
                backgroundImage: '-webkit-linear-gradient(-20deg, #2F2C46 50%, #B94F25 50%)'
            }}>
            </div>
            <div className="vs-icon"></div>
            <BigItem name="Item 1" color="#B94F25" side="left" ref={leftRef} onKeyDown={handleKeyDownLeft} onClick={handleClickLeft} />
            <BigItem name="Item 2" color="#2F2C46" side="right" ref={rightRef} onKeyDown={handleKeyDownRight} onClick={handleClickRight} />
        </div>
    )
}

export default VsPage;