import './index.css';
import { React, useState, createRef } from 'react';
import colors from './utils';
import AddItem from './addItem';

function Home(props) {
    const [addCard, setAddCard] = useState([{ visibility: true }, { visibility: true }, { visibility: true }, { visibility: false }]);

    const addNewItem = () => {
        setAddCard(addCard.slice(0, addCard.length - 1).concat([{ visibility: true }, { visibility: false }]));
    };

    const delItem = (index) => {
        setAddCard((prevItems) => {
            return prevItems.filter((item, i) => i !== index);
        });
    };

    const getItemsToSort = () => {
        const itemsToSort = [];
        var takenPattern = [];
        refElements.forEach((ref) => {
            if (ref.current) {
                let itemInfo = ref.current.getItem();
                let flag = false;
                while (!flag) {
                    let itemIcon = { "pattern": itemInfo.name[0].toUpperCase(), "color": Math.floor(Math.random() * colors.length)}
                    if (takenPattern.some(e => e.pattern === itemIcon.pattern && e.color === itemIcon.color) == false) {
                        takenPattern.push(itemIcon)
                        itemInfo.icon = itemIcon;
                        flag = true;
                    }
                }
                itemsToSort.push(itemInfo);
            }
        });
        props.setItemsToSort(itemsToSort)
    };

    const refElements = []
    for (let i = 0; i < addCard.length - 1; i++) {
        refElements.push(createRef());
    }

    return (
        <div className="background-container fix-background scrollable-page">
            <h1>Welcome on NerdLister !</h1>
            <h2>The website that helps you rank anything.</h2>

            <div className="add-item-container">
                {addCard.map((item, index) => (
                    <AddItem ref={refElements[index]} key={index} index={index} lenght={addCard.length} visibility={item.visibility} addNewItem={addNewItem} deleteElement={delItem} />
                ))}
            </div>
            <button className="start-ranking-btn" aria-label="Start ranking the elements" onClick={() => {
                getItemsToSort();
                props.onPageChange(1);
            }}>Start ranking now</button>
        </div>
    );
}

export default Home;