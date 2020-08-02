const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } = graphql;

const PokemonType = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        img: { type: GraphQLString},
        species: { type: GraphQLString},
        game: { 
            type: GameType,
            resolve(parent, args){
                //
                return _.find(
                    //games,
                    { id : parent.gameId } 
                );
            }
        },
    }),
});

const TrainerType = new GraphQLObjectType({
    name: 'Trainer',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        games: {
            type: new GraphQLList(GameType),
            resolve(parent, args){
                return _.filter(
                    //games,
                    {trainerId: parent.id}
                )
            }
        }
    }),
});

const GameType = new GraphQLObjectType({
    name: 'Game',
    fields: () => ({
        id: { type: GraphQLID},
        type_of_game: { type: GraphQLString},
        version: { type: GraphQLString},
        trainer: { 
            type: TrainerType,
            resolve(parent, args){
                return _.find(
                    //trainers,
                    { id: parent.trainerId }
                )
            }
        },
        pokemons: {
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                return _.filter(
                    //pokemons,
                    { gameId: parent.id}
                )
            }
        }
    }),
});


const Root = new GraphQLObjectType({
    name: 'RootType',
    fields: {
        pokemon: {
            type: PokemonType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                //get data
            }
        },
        trainer: {
            type: TrainerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //get data
            }
        },
        game: {
            type: GameType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                //get data
            }
        },
        pokemons :{
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                //return pokemons
            }
        },
        trainers :{
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                //return trainers
            }
        },
        games :{
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                //return games
            }
        }
    }
});

module.exports = new graphql.GraphQLSchema({
    query: Root,
});