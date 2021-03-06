
import React, { Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import SearchTask from './searchTask';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import "../style.scss";


export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	errorFirstName: false,
        	errorLastName: false,
            errorTitle: false,
            errorDescription: false,
            openUser: false,
            openTask: false,
            onCreateTask: props.onCreateTask,
            onCreateUser: props.onCreateUser,
            onSearchTask: props.onSearchTask,
            taskFound: props.taskFound,
            inputTitle: '',
            inputDescription: '',
            inputFirstName: '',
            inputLastName: '',
            message: '',
            success: false,
            successSearch: props.openTask
        };
        this.handleCreateTask = this.handleCreateTask.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
    }


	componentDidUpdate(prevProps){
        if(prevProps.taskFound !== this.props.taskFound) {
            this.setState({taskFound: this.props.taskFound});
        }
        if(prevProps.openTask !== this.props.openTask) {
            this.setState({successSearch: this.props.openTask});
        }
    } 

	Alert(props){
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

    handleClickUser = (event) => {
    	this.setState({openUser: true});
    };

    handleClickTask = (event) => {
    	this.setState({openTask: true});
    };

    handleCloseAlert = () => {
    	this.setState({success: false})
    }

    handleCloseUser = () => {
        this.setState({openUser: false})
    };

    handleCloseTask = () => {
        this.setState({openTask: false});
    };

    handleInput = (event) => {
    	this.setState({[event.target.name]: event.target.value})
    }

    handleCreateTask(){
    	if(this.state.inputDescription===''){
            this.setState({errorDescription: true})
        } else {
            this.setState({errorDescription: false})
        }
        if(this.state.inputTitle===''){
            this.setState({errorTitle: true})
        } else {
            this.setState({errorTitle: false})
        }
        if(this.state.inputTitle === '' && this.state.inputDescription === ''){
            this.setState({errorDescription: true, errorTitle: true})
        }
        else if(this.state.inputDescription!=='' && this.state.inputTitle!==''){
	    	this.props.onCreateTask(this.state.inputTitle, this.state.inputDescription);
	    	this.setState({openTask: false, success: true, message: "Task"});
	    }
    }

    handleCreateUser(){
    	if(this.state.inputFirstName===''){
            this.setState({errorFirstName: true})
        } else {
            this.setState({errorFirstName: false})
        }
        if(this.state.inputLastName===''){
            this.setState({errorLastName: true})
        } else {
            this.setState({errorLastName: false})
        }
        if(this.state.inputLastName === '' && this.state.inputFirstName === ''){
            this.setState({errorFirstName: true, errorLastName: true})
        }
        else if(this.state.inputFirstName!=='' && this.state.inputLastName!==''){
	    	this.props.onCreateUser(this.state.inputFirstName, this.state.inputLastName);
	    	this.setState({openUser: false, success: true, message: "User"});
	    }
    }

    render() {
        return(  
        	<div className="list">
        		<div className="buttonList">
	                <Button className="button" variant="outlined" name="openUser" onClick={this.handleClickUser}>
			        	Create User
			      	</Button>
			      	<Dialog className="dialog" open={this.state.openUser} onClose={this.handleCloseUser} aria-labelledby="form-dialog-title">
				        <DialogTitle id="form-dialog-title">Create user</DialogTitle>
				        <DialogContent>
				          <div className="textField">
					          <TextField
					            autoFocus
					            error={this.state.errorFirstName}
					            helperText={this.state.inputFirstName === "" ? 'Empty field!' : ' '}
					            label="First name"
					            margin="dense"
					            name="inputFirstName"
					            onChange={this.handleInput}
					            placeholder="First Name"
					            id="user-first-name"
					            type="text"
					            fullWidth
					          />
				          </div>
				          <div>
					          <TextField
					          	error={this.state.errorLastName}
					          	helperText={this.state.inputLastName === "" ? 'Empty field!' : ' '}
					          	label="Last name"
					            name="inputLastName"
					            margin="dense"
					            onChange={this.handleInput}
					            placeholder="Last Name"
					            id="user-last-name"
					            type="text"
					          />
				          </div>
				        </DialogContent>
				        <DialogActions className="dialogActions">
				          <Button onClick={this.handleCloseUser} color="secondary">
				            Cancel
				          </Button>
				          <Button onClick={this.handleCreateUser} color="primary">
				            Send
				          </Button>
				        </DialogActions>
			      	</Dialog>
		      	</div>
		      	<div className="buttonList">
			      	<Button variant="outlined" color="primary" onClick={this.handleClickTask}>
			        	Create task
			      	</Button>
			      	<Dialog className="dialog" open={this.state.openTask} onClose={this.handleCloseTask} aria-labelledby="form-dialog-title">
				        <DialogTitle id="form-dialog-title">Create task</DialogTitle>
				        <DialogContent>
				          <div className="textField">
					          <TextField
					            autoFocus
					            error={this.state.errorTitle}
					            helperText={this.state.inputTitle === "" ? 'Empty field!' : ' '}
					            label="Title"
					            margin="dense"
					            name="inputTitle"
					            placeholder="Title"
					            id="task-title"
					            onChange={this.handleInput}
					            type="text"
					            fullWidth
					          />
				          </div>
				          <div>
					          <TextField
					          	error={this.state.errorDescription}
					          	helperText={this.state.inputDescription === "" ? 'Empty field!' : ' '}
					            margin="dense"
						        multiline
						        name="inputDescription"
						        variant="outlined"
						        rows={3}
					            label="Description"
					            onChange={this.handleInput}
					            id="task-description"
					            type="text"
					          />
				          </div>
				        </DialogContent>
				        <DialogActions className="dialogActions">
				          <Button onClick={this.handleCloseTask} color="secondary">
				            Cancel
				          </Button>
				          <Button onClick={this.handleCreateTask} color="primary">
				            Send
				          </Button>
				        </DialogActions>
			      	</Dialog>
		      	</div>
		      	<Snackbar open={this.state.success} autoHideDuration={3000} onClose={this.handleCloseAlert}>
		            <this.Alert name="success" id="success" onClose={this.handleCloseAlert} severity="success">
		            	{`${this.state.message} created successfully!`}
		            </this.Alert>
		        </Snackbar>
        		<SearchTask 
        			onHandleSearch={this.state.onSearchTask} 
        			taskFound={this.state.taskFound} 
        			successTask={this.state.successSearch}>
        		</SearchTask>
            </div>
        );
    }
}

TopBar.propTypes = {
    onCreateTask: PropTypes.func,
    onCreateUser: PropTypes.func
};


