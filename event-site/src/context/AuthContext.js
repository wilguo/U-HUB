import React, { Component } from 'react'
import { login, authenticate, logout } from '../api/auth';
import { subscribeToTopic, unsubscribeFromTopic } from '../api/user';
import { setGoing } from '../api/posts';


const AuthContext = React.createContext();

class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        }
    }

    async componentDidMount() {
        try {
            const authentication = await authenticate();

            if(authentication.authenticated) {
                this.setState({currentUser: authentication.user, authenticated: true});
            } else {
                this.setState({authenticated: false})
            }
        } catch(e) {
            console.log(e.message);
        }        
    }

    login = async (username, password) => {


        try {
            const user = await login(username, password);
            this.setState({currentUser: user});
            return user;
        } catch(e) {
            console.log(e.message);
        }

        return false;
    }
    logout = async () => {
        await logout();

        this.setState({ currentUser: null, authenticated: false })
    }

    postRegistration = (user) => {
        this.setState({currentUser: user, authenticated: true})
    }

    subscribe = async (topic) => {
        try {
            const user = await subscribeToTopic(topic.path.toLowerCase().slice(1));
            
            this.setState({currentUser : user})
        } catch (e) {
            console.log(e);
            alert(e);
        }      
    }

    unsubscribe = async (topic) => {
        try {
            const user = await unsubscribeFromTopic(topic.path.toLowerCase().slice(1));
            
            this.setState({currentUser : user})
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    setGoing = async (postId, going) => {
        try {
            const { user } = await setGoing(postId, going);

            this.setState({currentUser: user})
        } catch(e) {
            console.log(e);
            alert(e);
        }
    }

    render() {
        return (
            <AuthContext.Provider value={{
                currentUser: this.state.currentUser,
                login: this.login,
                logout: this.logout,
                subscribe: this.subscribe,
                unsubscribe: this.unsubscribe,
                postRegister: this.postRegistration,
                authenticated: this.state.authenticated,
                setGoing: this.setGoing
            }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
