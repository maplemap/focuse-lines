import {useEffect} from 'react';
import axios from 'axios';
import './styles/main.scss';

export const App = () => {
  useEffect(() => {
    window.api = {
      users: {
        getAll: async () => {
          const {data} = await axios.get('/api/users');
          console.log(data);
        },
      },
      user: {
        get: async (id) => {
          if (id) {
            const {data} = await axios.get(`/api/user?id=${id}`);
            console.log(data);
          } else {
            console.log('Please provide an id');
          }
        },
        create: async ({name, email, password, confirmation}) => {
          if (name && email && password === confirmation) {
            const {data} = await axios.post('/api/user', {
              name,
              email,
              password,
              confirmation,
            });
            console.log(data);
          } else {
            console.log(
              'Please provide the next fields: name, email, password, confirmation',
            );
          }
        },
        update: async ({id, name, email}) => {
          if (id && (name || email)) {
            const {data} = await axios.put('/api/user', {
              id,
              name,
              email,
            });
            console.log(data);
          } else {
            console.log('Please provide a name and email');
          }
        },
        remove: async (id) => {
          if (id) {
            const {data} = await axios.delete(`/api/user?id=${id}`);
            console.log(data);
          } else {
            console.log('Please provide an id');
          }
        },
      },
    };

    console.log('Please type `api` in console', window.api);
  }, []);

  return <div>Please take a look at the console.</div>;
};
