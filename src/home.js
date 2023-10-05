import './index.css';
import { React, useState, createRef } from 'react';
import colors from './utils';
import AddItem from './addItem';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PresetItems from './preset-items';

const MySwal = withReactContent(Swal)

function Home(props) {
    const [addCard, setAddCard] = useState([{ visibility: true }, { visibility: true }, { visibility: true }, { visibility: false }]);
    const preSets = [
        { name: "🎨 Colors", items: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Black", "White"] },
        { name: "⭐ Superpowers", items: ["Super strength", "Super speed", "Flight", "Teleportation", "Invisibility", "Telekinesis", "Mind reading", "Time travel", "Healing", "Immortality"] },
        { name: "🎸 Musical instruments", items: ["Piano", "Guitar", "Violin", "Drums", "Saxophone", "Flute", "Trumpet", "Bass guitar", "Harp", "Accordion"] },
        { name: "🌍 Travel destinations", items: ["Paris", "New York", "Tokyo", "Rome", "Sydney", "London", "Barcelona", "Cape Town", "Rio de Janeiro", "Bali"] },
        { name: "🍕 Pizza toppings", items: ["Pepperoni", "Mushrooms", "Green peppers", "Onions", "Olives", "Bacon", "Ham", "Pineapple", "Sausage", "Tomatoes"] },
        { name: "🎬 Movie genres", items: ["Action", "Comedy", "Drama", "Horror", "Sci-fi", "Romantic comedy", "Animation", "Thriller", "Fantasy", "Adventure"] },
        { name: "🍦 Ice cream flavors", items: ["Vanilla", "Chocolate", "Strawberry", "Raspberry", "Straciatella", "Mint Chocolate Chip", "Butter Pecan", "Coffee", "Pistachio"] },
    ]

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
                if (itemInfo.name !== "") {
                    let flag = false;
                    while (!flag) {
                        let itemIcon = { "pattern": itemInfo.name[0].toUpperCase(), "color": Math.floor(Math.random() * colors.length) }
                        if (takenPattern.some(e => e.pattern === itemIcon.pattern && e.color === itemIcon.color) == false) {
                            takenPattern.push(itemIcon)
                            itemInfo.icon = itemIcon;
                            flag = true;
                        }
                    }
                    itemsToSort.push(itemInfo);
                }
            }
        });

        if (itemsToSort.length < 3) {
            MySwal.fire({
                title: <p style='color:black'>You need at least three items to start ranking them !</p>,
                showConfirmButton: true,
                confirmButtonAriaLabel: 'Close the alert',
                confirmButtonColor: '#2F2C46',
            })
            return false;
        }

        props.setItemsToSort(itemsToSort)
        return true;
    };

    const refElements = []
    for (let i = 0; i < addCard.length - 1; i++) {
        refElements.push(createRef());
    }

    return (
        <div className="background-container fix-background scrollable-page">
            <h1>Welcome on NerdLister !</h1>
            <h2>The website that helps you rank anything.</h2>
            <p>Fill in the cards with your items and let the ranking begin. For a quick start, choose from our ready-made lists below.</p>

            <div className="preset-items-container">
                {preSets.map((item, index) => (
                    <PresetItems ref={createRef()} key={index} id={index} name={item.name} onClick={() => {
                        const items = item.items;
                        const itemsToSort = [];
                        var takenPattern = [];
                        items.forEach((item) => {
                            let flag = false;
                            while (!flag) {
                                let itemIcon = { "pattern": item[0].toUpperCase(), "color": Math.floor(Math.random() * colors.length) }
                                if (takenPattern.some(e => e.pattern === itemIcon.pattern && e.color === itemIcon.color) == false) {
                                    takenPattern.push(itemIcon)
                                    itemsToSort.push({ "name": item, "icon": itemIcon });
                                    flag = true;
                                }
                            }
                        });
                        props.setItemsToSort(itemsToSort)
                        props.onPageChange(1);
                    }} />
                ))}
            </div>

            <div className="add-item-container">
                {addCard.map((item, index) => (
                    <AddItem ref={refElements[index]} key={index} index={index} lenght={addCard.length} visibility={item.visibility} addNewItem={addNewItem} deleteElement={delItem} />
                ))}
            </div>
            <button className="btn" aria-label="Start ranking the elements" onClick={() => {
                if (getItemsToSort()) {
                    props.onPageChange(1);
                }
            }}>Start ranking now</button>
        </div>
    );
}

export default Home;
