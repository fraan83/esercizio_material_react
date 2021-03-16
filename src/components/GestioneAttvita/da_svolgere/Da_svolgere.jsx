import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import './Da_svolgere.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";

import { UseTasks, UseOperatore } from '../hook/useData';

import TableContainer from '@material-ui/core/TableContainer';

import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    head: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    headright: {
        padding: theme.spacing(1),
        textAlign: 'right',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export default class Da_svolgere extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="da_svolgere">

                <Griglia key={this.state}></Griglia>
            </div>
        )

    }
}


function Griglia() {

    const [tasks, setTasks] = UseTasks(
        [{
            user_id: 0,
            fristname: '',
            task_id: 0,
            task: '',
            done: false,

        }]
    );
    //let taskLenght = tasks.length;
    // console.log('tlenght', taskLenght)
    const [operatori, setOperatori] = UseOperatore();
    const [q, setQ] = useState("");

    const [newTask, setNewtask] = useState(
        [{
            user_id: 0,
            fristname: '',
            task_id: 0,
            task: '',
            done: false,

        }]
    )


    const columns = [
        { title: 'task_id', field: 'task_id', hidden: true },
        { title: 'user_id', field: 'user_id', hidden: true },
        { title: 'Operatore', field: 'firstname', align: 'left', width: "20%" },
        { title: 'Attività', field: 'task', width: "70%" },
        {
            title: 'da svolgere', field: 'done', sorting: false, align: 'right', width: "10%", render: (row) => {

                if (row.done === false) {
                    return <a type="submit" onClick={(e) => svolgiTask(e, row)} className="btn-svolgi">Svolgi</a>
                } else {
                    return <a disabled className="disabled">Svolto</a>
                }

            }
        }

    ]


    function filtraPerOperatore(rows) {
        return rows.filter(
            (row) =>
                row.user_id.toLowerCase().indexOf(q) > -1 && row.done === false
        )
    }



    function svolgiTask(e, row) {


        const updateItem = {
            user_id: row.user_id,
            firstname: row.firstname,
            task_id: row.task_id,
            task: row.task,
            done: true
        }
        setTasks(
            [...tasks, updateItem]

        );
        e.target.className = "disabled"
        e.target.innerText = "Svolto"

        console.log(tasks)
    }

    const classes = useStyles();

    const salvaTask = (e) => {
        e.preventDefault()

        let descrizione = document.getElementById('descrizione_attivita').innerText
        let selctName = document.getElementById('selezionaOperatoreSelect').innerText
        let taskLenght = tasks.length;
 
            const newItem = {
                user_id: newTask.user_id,
                firstname: selctName,
                task_id: taskLenght + 1,
                task: newTask.task,
                done: newTask.done
            }
            //   console.log('nt',newTask.user_id, newTask.firstname, newTask.task_id, newTask.task, newTask.done)
            setTasks(
                [...tasks, newItem]

            );
        

    }
    const annullaTask = (e) => {

    }


    const handleInputChange = (event) => {


        setNewtask({
            ...newTask,
            [event.target.name]: event.target.value,
            task_id: '',
            firstname: '',
            done: false

        })

    }
    return (

        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.head}>
                        <h3>Attività da completare </h3>
                    </Paper>
                </Grid>

            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel id="selezionaOperatoreAttivitaTop">Filtra per Operatore</InputLabel>
                            <Select
                                onChange={(e) => { setQ(e.target.value) }}
                                autoFocus={true}
                                style={{ width: '99%' }}
                                labelId="selezionaOperatoreAttivitaTop"
                                id="selezionaOperatoreSelectTop"
                                value={operatori.firstname}
                            >
                                {operatori.map(({ id, firstname }) => (
                                    <MenuItem value={id} label={firstname}>
                                        {firstname}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Paper>

                </Grid>


            </Grid>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>

                        <TableContainer component={Paper}>
                            <MaterialTable title="Attività da Completare"
                                data={filtraPerOperatore(tasks)}
                                columns={columns}

                                key={tasks.task_id}
                                options={{
                                    headerStyle: {
                                        backgroundColor: '#ba0208',
                                        color: '#FFF'
                                    },
                                    toolbar: false,
                                    search: true,


                                }}
                            >

                            </MaterialTable>
                        </TableContainer>
                    </Paper>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Paper className={classes.head}>
                                <h3>Nuova Attività </h3>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper>
                                <TextField variant="outlined"
                                    name="task"
                                    value={newTask.task}
                                    onChange={handleInputChange}
                                    id="descrizione_attivita" label="Descrizione"
                                    style={{ width: '98%' }}
                                    required
                                    fullWidth
                                    className={classes.formControl}
                                  
                                     />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                    <InputLabel
                                       required
                                       helperText="Campo obbligatorio." id="selezionaOperatoreAttivita">Operatore</InputLabel>
                                    <Select
                                        onChange={(e) => { handleInputChange(e) }}
                                        name="user_id"
                                        text={operatori.firstname}
                                        style={{ width: '98%' }}
                                        labelId="selezionaOperatoreAttivita"
                                        id="selezionaOperatoreSelect"
                                        value={operatori.firstname}
                                        
                                    >
                                        {operatori.map(({ id, firstname }) => (
                                            <MenuItem value={id} key={id} firstname={firstname}>
                                                {firstname}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>

                    </Grid>

                    <Grid item xs={12}  >
                        <Paper variant="outlined" square spacing={16} className={classes.headright} >
                            <Button variant="contained" color="secondary" onClick={(e) => { annullaTask(e) }}  >Annulla</Button>
                            <Button variant="contained" color="primary" onClick={(e) => { salvaTask(e) }} >Salva</Button>
                        </Paper>
                    </Grid>


                </Grid>

            </Grid>

        </div>
    );

}


