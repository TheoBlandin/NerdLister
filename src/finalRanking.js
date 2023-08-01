import './index.css';
import React from 'react';
import PodiumElement from './podiumElement';
import RankItem from './rankItem';

class FinalRanking extends React.Component {
    podiumItemsData = this.props.items.slice(0, 3);
    rankItemsData = this.props.items.slice(3);

    podiumItems = this.podiumItemsData.map((item, index) => (
        <PodiumElement key={index} item={item} rank={index + 1} />
    ));

    rankItems = this.rankItemsData.map((item, index) => (
        <RankItem key={index + 3} item={item} rank={index + 4} />
    ));

    render() {
        return (
            <div className="background-container fix-background scrollable-page">
                <h1>Final Ranking</h1>
                <div className="podium">
                    {this.podiumItems}
                </div>
                <div className="separator"></div>
                {this.rankItems}
                <button className="start-ranking-btn" aria-label="Start ranking the elements" onClick={() => {
                    this.props.onPageChange(0);
                }}>Start a new ranking</button>
            </div>
        );
    }
}

export default FinalRanking;