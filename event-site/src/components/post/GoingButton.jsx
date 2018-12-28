import React from 'react'
import { Button } from '@material-ui/core';
import { AuthConsumer } from "../../context/AuthContext";

class GoingButtonComponent extends React.Component {

    constructor(props) {
        super(props);

        const { user } = props;

        this.state = {
            going: this.isGoing(user),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({going: this.isGoing(nextProps.user)})
    }


    addUserToGoing = async () => {
        this.props.setGoing(this.props.post._id, true);
    }

    removeUserFromGoing = async () => {
        this.props.setGoing(this.props.post._id, false);
    }

    isGoing = (user) => {
        return user.goingToEvents.includes(this.props.post._id);
    }


    render() {
        if (this.state.going) {
            return (<Button onClick={() => this.removeUserFromGoing()} variant="contained" size="medium" color="secondary">
                Cancel
            </Button>)
        }
        return (
            <Button onClick={() => this.addUserToGoing()} variant="contained" size="medium" color="primary">
                Going
        </Button>)

    }
}

export default class GoingButton extends React.Component {

    render() {
        const { post } = this.props;

        return (
            <AuthConsumer>
                {({ currentUser, setGoing }) => currentUser ?
                    <GoingButtonComponent user={currentUser} post={post} setGoing={setGoing}/> :
                    <Button variant="contained" size="medium" color="primary">
                        You need to Login
                    </Button>
                }
            </AuthConsumer>
        )
    }
}
