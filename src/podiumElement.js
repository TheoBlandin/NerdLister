import React from 'react';
import './podiumElement.css';
import MidItem from './midItem';

class PodiumElement extends React.Component {
    styling = {
        height: [
            '450px',
            '350px',
            '250px',
        ],
        backgroundColor: [
            '#FFFFFF',
            '#EBEBEB',
            '#D6D6D6'
        ],
        rankColor: [
            '#FFD700',
            '#C0C0C0',
            '#E78F38'
        ],
        borderRadius: [
            '10px 10px 0 0',
            '10px 0 0 0',
            '0 10px 0 0'
        ]
    }

    render() {
        return (
            <div className="podium-element" style={{
                order: this.props.rank == 1 ? 2 : this.props.rank == 2 ? 1 : 3
            }}>
                <MidItem icon={this.props.item.icon} />
                <div className="step" style={{
                    height: this.styling.height[this.props.rank - 1],
                    backgroundColor: this.styling.backgroundColor[this.props.rank - 1],
                    borderRadius: this.styling.borderRadius[this.props.rank - 1]
                }}>
                    <div className="step-content">
                        <div className="rank-top" style={{
                            color: this.styling.rankColor[this.props.rank - 1]
                        }}>{this.props.rank}</div>
                        <div className="name-item">{this.props.item.name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PodiumElement;