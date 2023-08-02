import React from 'react';
import './items.css';
import colors from './utils';

class BigItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icon: ''
        };
    }

    updateName(newName) {
        this.setState({
            name: newName,
        });
    }

    updateIcon(newIcon) {
        this.setState({
            icon: newIcon
        });
    }

    render() {
        return (
            <div tabIndex="0" className="big-item" onKeyDown={this.props.onKeyDown} onClick={this.props.onClick} style={{
                marginTop: this.props.side == "left" ? '3%' : '0%',
                marginLeft: this.props.side == "left" ? '8%' : '0%',
                marginRight: this.props.side == "left" ? '0%' : '8%',
                marginBottom: this.props.side == "left" ? '0%' : '3%',
                bottom: this.props.side == "right" ? 0 : 'auto',
                right: this.props.side == "right" ? 0 : 'auto',
            }}>
                <div style={{
                    position: "relative",
                }}>
                    <button className='big-item-icon' style={{
                        color: colors[this.state.icon.color]
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