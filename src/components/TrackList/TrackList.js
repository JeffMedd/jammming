import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {

    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                        return <Track
                            track={track}
                            key={track.id}
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                             />
                    })
                }
            </div>
        );
    }
}

export default TrackList;

//you will add a map method that renders a set of Track components//
// for now you will hard code three tracks. in a later assessment we will replace//
  //  {console.log(props.name)}
