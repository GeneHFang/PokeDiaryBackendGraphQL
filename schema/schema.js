// const _ = require('lodash');

const Pokemon = require('../models/Pokemon');
const Trainer = require('../models/Trainer');
const Game = require('../models/Game');

const graphql = require('graphql');
const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList 
} = graphql;

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
                return Game.findById(parent.gameId);
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
                return Game.find({
                    trainerId: parent.id,
                });
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
                return Trainer.findById(parent.trainerId);
            }
        },
        pokemons: {
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                return Pokemon.find({
                   gameId: parent.id, 
                });
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
                return Pokemon.findById(args.id);
            }
        },
        trainer: {
            type: TrainerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Trainer.findById(args.id);
            }
        },
        trainer_by_name: {
            type: new GraphQLList(TrainerType),
            args: { name: { type: GraphQLString } },
            resolve(parent, args){
                return Trainer.find({name: args.name});
            }
        },
        game: {
            type: GameType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Game.findById(args.id);
            }
        },
        pokemons :{
            type: new GraphQLList(PokemonType),
            resolve(parent, args){
                return Pokemon.find({});
            }
        },
        trainers :{
            type: new GraphQLList(TrainerType),
            resolve(parent, args){
                return Trainer.find({});
            }
        },
        games :{
            type: new GraphQLList(GameType),
            resolve(parent, args){
                return Game.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPokemon: {
            type: PokemonType,
            args: {
                name: { type: GraphQLString },
                img: { type: GraphQLString },
                species: { type: GraphQLString },
                gameId: { type: GraphQLID }
            },
            resolve(parent, args){
                let poke = new Pokemon({
                    name: args.name,
                    img: args.img,
                    species: args.species,
                    gameId: args.gameId,
                });

                return poke.save();
            }
        },
        addGame: {
            type: GameType,
            args: {
                type_of_game: { type: GraphQLString },
                version: { type: GraphQLString },
                trainerId: { type: GraphQLID }
            },
            resolve(parent, args){
                let gam = new Game({
                    type_of_game: args.type_of_game,
                    version: args.version,
                    trainerId: args.trainerId,

                });
                
                return gam.save();
            }
        }
        
        ,

        addTrainer: {
            type: TrainerType,
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args){
                let train = new Trainer({
                    name: args.name,
                });

                return train.save();
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: Root,
    mutation: Mutation,
});