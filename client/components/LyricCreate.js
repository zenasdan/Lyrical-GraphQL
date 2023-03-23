import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { content: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: { 
                content: this.state.content, 
                songId: this.props.songId // cannot access through state because react router will only pass the route param to the first component it renders. Here it would be SongDetail component. Need to pass that down to this component from there.
            }
        }).then(() => this.setState({ content: '' }));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input 
                    value={this.state.content}
                    onChange={event => this.setState({ content: event.target.value })}
                />
            </form>
        );
    }
}

const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID) {
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
            }
        }
    }
`;

export default graphql(mutation)(LyricCreate);