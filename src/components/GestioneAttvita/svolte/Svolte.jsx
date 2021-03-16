import React, { useEffect, useState } from 'react';
import { Component } from 'react';
import './Svolte.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { UseTasks, UseOperatore } from '../hook/useData';
import TableContainer from '@material-ui/core/TableContainer'; 
import MaterialTable from 'material-table';
 


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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



export default class Svolte extends Component {

    render() {
        return (
            <div>
                <Griglia></Griglia>
            </div>
        )

    }
}

function Griglia() {

    const [tasks, setTasks] = UseTasks();
    const [operatori, setOperatori] = UseOperatore();
    const [svolgi, setSvolgi] = useState(false);
    const [q, setQ] = useState("");
    
    
    //----------------------
    //dati griglia
    //----------------------


    const columns = [
        { title: 'id', field: 'task_id', hidden: true },
        { title: 'Operatore', field: 'firstname', align: 'left', width: "20%" },
        { title: 'Attività', field: 'task', width: "70%" },
        {
            title: 'da svolgere', field: 'done', sorting: false, align: 'right', width: "10%", render: (row) => {
                if (row.done === false) {
                    return <button onClick={(e) => svogliOnClick(row)} className="btn-svolgi">Svolgi</button>
                } else {
                    return <button disabled className="disabled">Svolto</button>
                }
            }
        },
    ]

    const classes = useStyles();

    function filtraPerOperatore(rows){
        return rows.filter(
            (row) => 
            row.user_id.toLowerCase().indexOf(q) > -1 && row.done === true
        )
    }
    

    const svogliOnClick = (row) => {
        //
    };

    return (

        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.head}>
                        <h3>Attività completate </h3>
                    </Paper>
                </Grid>

            </Grid>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Paper className={classes.paper}>
                        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                            <InputLabel id="selezionaOperatoreAttivitaTop">Filtra per Operatore</InputLabel>
                            <Select
                                onChange={(e) => { setQ(e.target.value)}}
                                style={{ width: '98%' }}
                                labelId="selezionaOperatoreAttivitaTop"
                                id="selezionaOperatoreSelectTop"
                                value={operatori.id}
                            >
                                {operatori.map(({ id, firstname }) => (
                                    <MenuItem value={id} name={firstname}>
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
                                
                                options={{
                                    headerStyle: {
                                        backgroundColor: '#ba0208',
                                        color: '#FFF'
                                    },
                                    toolbar: false,
                                    search: false,


                                }}>

                            </MaterialTable>
                        </TableContainer>
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}


