const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

//dummy data
var books = [
    {name:'Name of wind', genre:'Fantasy',id:'1'},
    {name:'The Final Empire', genre:'Fantasy',id:'2'},
    {name:'The Long Earth', genre:'Sci-Fi',id:'3'},
    {name:'The Long Earths', genre:'Sci-Fi',id:'3'},
    {name:'The Long Earthed', genre:'Fantasy',id:'4'}
];

var authors = [
    {name:'abc', age:34,id:'1'},
    {name:'def', age:52,id:'2'},
    {name:'ghi', age:79,id:'3'},
    {name:'ghi', age:79,id:'4'},
];

const BookType = new GraphQLObjectType({
  name:'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
        type: AuthorType,
        resolve(parent,args) {
            console.log(parent);
            //code to relate book and author
            return _.find(authors, { id: parent.id});
        }

    }
  })
});


const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields: () => ({
      id: {type: GraphQLID },
      name: {type: GraphQLString},
      age: {type: GraphQLInt},
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            console.log(parent);
            return _.filter(books, { id: parent.id});
        }

      }
    })
  });


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      book: {
        type: BookType,
        args: {id: {type:GraphQLID}},
        resolve(parent,args){
            //code to get from DB
            return _.find(books, {id: args.id});
        }
      },
      author: {
        type: AuthorType,
        args: {id: {type: GraphQLID}},
        resolve(parent, args) {
            //code to get frm DB
            return _.find(authors, {id: args.id});
        }
      },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent,args) {
            return books;
        }
      },
      authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent, args) {
            return authors;
        }
      }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})