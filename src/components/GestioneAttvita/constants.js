export const GRAPHQL_API = 'https://fakeql.com/graphql/e2896ed50e3ad6827480698660091d49';
export const GET_TASKS_QUERY = 
`
{
    todos {
        user {
        id
        firstname
        }
        task
        id
        done
    }
    }
    
                       
`;

export const GET_USERS_QUERY = 
`
{
    users {
      firstname
      id
    }
  }
                      
`;