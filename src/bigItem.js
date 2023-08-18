import React from 'react';
import './items.css';
import colors from './utils';

class BigItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icon: '',
            animate: true,
            push: false
        };
        this.handleActiveButton = this.handleActiveButton.bind(this);
    }

    updateItem(newName, NewIcon) {
        this.setState(prevState => ({
            name: newName,
            icon: NewIcon,
            animate: true,
            push: false
        }));
    }

    handleActiveButton() {
        this.setState({
            push: true,
            animate: false
        });
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.handleActiveButton()
        }
    }

    render() {
        return (
            <div key={Math.random()} className="big-item" style={{
                marginTop: this.props.side == "left" ? '3%' : '0%',
                marginLeft: this.props.side == "left" ? '8%' : '0%',
                marginRight: this.props.side == "left" ? '0%' : '8%',
                marginBottom: this.props.side == "left" ? '0%' : '3%',
                bottom: this.props.side == "right" ? 0 : 'auto',
                right: this.props.side == "right" ? 0 : 'auto',
                animation: this.state.animate ? this.props.side == "left" ? 'slideInFromLeft 0.4s ease-out' : 'slideInFromRight 0.4s ease-out' : "",
            }}>
                <div style={{
                    position: "relative",
                }}>
                    <button className='big-item-icon' onKeyDown={this.handleKeyDown} onClick={(this.handleActiveButton)} onAnimationEnd={() => {
                        console.log("animation end");
                        this.props.onClick()
                    }} style={{
                        color: colors[this.state.icon.color],
                        animation: this.state.push ? "pushButton 300ms" : ""
                    }}>{this.state.icon.pattern}</button>
                    <div className="big-item-icon" style={{
                        backgroundColor: this.props.color,
                        transform: "translate(12px, 12px)",
                        zIndex: -1,
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}></div>
                </div>
                <div className="big-item-name">{this.state.name}</div>
            </div>
        );
    }
}

export default BigItem;