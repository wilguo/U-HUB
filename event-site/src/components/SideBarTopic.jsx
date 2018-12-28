import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AuthConsumer } from '../context/AuthContext';
import {Star, StarBorder} from '@material-ui/icons'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
  // initial state is based on the topics the user is subscribed to
  constructor(props) {
    super(props);

    const { topicsArray, topic } =  this.props;

    this.state = {
      checked: topicsArray.includes(topic.name.toLowerCase())
    }
  }

  handleToggleUser = (topic, subscribe, unsubscribe) => () => {
    const { checked } = this.state;
    this.setState({
      checked: (checked ? false : true),
    });
    !checked ? subscribe(topic) : unsubscribe(topic)


  };


  render() {
    const { topic } = this.props;
    const { selected } = this.props


    return (
        <ListItem button selected={selected}>
          <ListItemIcon>
              {React.cloneElement(topic.icon, { color: selected ? 'primary' : 'inherit' })}
          </ListItemIcon>
          <ListItemText primary={topic.name} />
          <ListItemSecondaryAction>
          <AuthConsumer>
          {({currentUser, subscribe, unsubscribe}) => (
              currentUser ?
              <Checkbox
                icon={<StarBorder />}
                checkedIcon={<Star />}
                onClick={this.handleToggleUser(topic, subscribe, unsubscribe)}
                checked={this.state.checked}
                color = "primary"
              /> : null
            )}
          </AuthConsumer>
          </ListItemSecondaryAction>
        </ListItem>
    );
  }
}

CheckboxListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
