import { useState, useEffect } from 'react';
import * as Constants from '../constants';


/*xport default function useUser() {
    const [users, setUsers] = useState( { users: [] });
    useEffect(() => {
        //Chiamata GraphQL API
        (async () => {
            const response = await fetch('https://fakeql.com/rest/e2896ed50e3ad6827480698660091d49/users');
            //const json = await response.json();
            setUsers(await response.json());

           
        })();
    }, []);

    
    return users;
}


export function UseTodo() {
    const [todo, setTodo] = useState([])

    useEffect(() => {
        //Chiamata GraphQL API
        (async () => {
            const response = await fetch(Constants.GRAPHQL_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                     query {
                        
                        todos {
                          id
                          done
                          task
                        }
                      }
                      `
                }),
            }).then(res => res.json())
                .then(data => {
                    //console.log('usetodo', data.data.todos);
                    setTodo(data.data);
                });

        })();
    }, []);

    return [todo, setTodo];

}
*/
export function UseOperatore() {
    const [operatore, setOperatore] = useState([])

    useEffect(() => {
        //Chiamata GraphQL API
        (async () => {
            const response = await fetch(Constants.GRAPHQL_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: Constants.GET_USERS_QUERY
                }),
            }).then(res => res.json())
                .then(data => {
                    // console.log('useoperatore',data.data.users);
                    setOperatore(data.data.users);
                });

        })();
    }, []);

    return [operatore, setOperatore];
}


export function UseTasks() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        //Chiamata GraphQL API
        (async () => {
            const response = await fetch(Constants.GRAPHQL_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: Constants.GET_TASKS_QUERY
                }),
            }).then(res => res.json())
                .then(data => {
                    
                    let datiTasks = Object.values(data.data.todos);
                    var rowGriglia = [];
                    datiTasks.forEach(row => {
                        rowGriglia.push({
                            user_id: row.user.id,
                            firstname: row.user.firstname,
                            task_id: row.id,
                            task: row.task,
                            done: row.done,
                        });
                    });
                    setTasks(rowGriglia);
                    //console.log('setTasks', rowGriglia);
                });

        })();
    }, []);


    return [tasks, setTasks];
}