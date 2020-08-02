const env = require('./env');
const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();

mongoose.connect(env.DB_CONNECTION_STRING);
mongoose.connection.once( 'open', () => {
    console.log("db connected");
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(4000, () => {
    console.log("listening on port 4000");
});
