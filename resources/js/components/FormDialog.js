import React, {useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DialogTitle from "@material-ui/core/DialogTitle";

const FormDialog = (props) => {
    const {open, handleClose, handleSubmit, task} = props;

    const [name, setName] = useState({value: '', error: ''});
    const [description, setDescription] = useState({value: '', error: ''});
    const [status, setStatus] = useState(0);

    useEffect(() => {
        setName({value: task ? task.name : '', error: ''});
        setDescription({value: task ? task.description : '', error: ''});
        setStatus(task ? task.completed : 0);
    }, [task]);

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            aria-labelledby="task-dialog"
        >
            <DialogTitle id="dialog-title">{task ? 'Edit' : 'Create'} Task</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name.value}
                    onChange={e => setName({value: e.target.value, error: ''})}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    value={description.value}
                    onChange={e => setDescription({value: e.target.value, error: ''})}
                />

                {task && (
                    <FormControl fullWidth>
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            STATUS
                        </InputLabel>
                        <Select
                            margin="dense"
                            fullWidth
                            native
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            inputProps={{
                                name: 'status',
                                id: 'status',
                            }}
                        >
                            <option value={0}>Ongoing</option>
                            <option value={1}>Completed</option>
                        </Select>
                    </FormControl>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    handleSubmit(name.value, description.value, task ? task.id : null, status);
                }} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;