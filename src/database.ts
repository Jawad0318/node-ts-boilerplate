import { set, connect } from 'mongoose';
import{MONGODB_URI} from '@config';

// setting 
set('debug', true);

// connection 
connect(MONGODB_URI, {
    // common settings
    ignoreUndefined: true,
})

    // eslint-disable-next-line no-console
    .then(() => console.log('we are connected with the database:)'))
    .catch((err) => {
    // eslint-disable-next-line no-console

        console.log('DB Connection Error :(---------------->', err);
    });