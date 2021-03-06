const { gql } = require("apollo-server");

const typeDefs = gql`
  directive @AuthorizationUser on QUERY | FIELD_DEFINITION | FIELD
  directive @AuthorizationArtist on QUERY | FIELD_DEFINITION | FIELD

  scalar Date

  type Token {
    token: String
  }

  # objeto User, de base de datos
  type User {
    _id: ID
    name: String!
    lastName: String
    age: Int
    email: String!
    createdAt: Date
    updatedAt: Date
    password: String
  }

  # objeto Artist, de base de datos
  type Artist {
    _id: ID
    name: String!
    about: String
    albums: [ID]
    email: String!
    password: String!
  }

  type ArtistInfo {
    _id: ID
    email: String
    password: String
    name: String!
    about: String
    albums: [Album]
  }

  # objeto Album, de base de datos
  type Album {
    _id: ID
    title: String!
    genre: [String]
    artist: ID!
    songs: [ID]
    createdAt: Date
    updatedAt: Date
  }

  type AlbumInfo {
    _id: ID
    title: String!
    genre: [String]
    artist: Artist
    songs: [Song]
    createdAt: Date
    updatedAt: Date
  }

  # objeto Song, de base de datos
  type Song {
    _id: ID
    title: String!
    albumID: ID!
    genre: String!
    duration: String!
    createdAt: Date
    updatedAt: Date
  }

  # argumento UserInput, para la mutation
  input UserInput {
    name: String!
    age: Int
    email: String!
    lastName: String
    password: String!
    profileImage: Upload
  }

  # argumento ArtistInput, para la mutation
  input ArtistInput {
    name: String!
    about: String
    email: String!
    password: String!
    profileImage: Upload
  }

  # argumento AlbumInput, para la mutation
  input AlbumInput {
    title: String!
    genre: [String]
  }

  # argumento SongInput, para la mutation
  input SongInput {
    title: String!
    genre: String!
    albumID: ID!
    duration: String!
    song: Upload
  }

  type Query {
    # TODOS LOS GETS
    getUser(userID: ID): [User]
    getArtist(artistID: ID): [Artist]
    getAlbum(albumID: ID): [Album] @AuthorizationArtist
    getSong(songID: ID): Song @AuthorizationArtist
    getArtistAlbums(artistID: ID): ArtistInfo @AuthorizationArtist
    getAlbumSongs(albumID: ID): AlbumInfo @AuthorizationArtist
    getAlbumArtist(albumID: ID): AlbumInfo @AuthorizationArtist
  }

  type Mutation {
    # CUD USER
    userLogin(email: String!, password: String!): Token
    addUser(userData: UserInput): Token
    updateUser(userID: ID, userData: ArtistInput): User
    removeUser(userID: ID): User

    # CUD ARTIST
    addArtist(artistData: ArtistInput): Token
    updateArtist(artistID: ID, artistData: ArtistInput): Artist
    removeArtist(artistID: ID): Artist

    # CUD ALBUM
    addAlbum(albumData: AlbumInput): Album @AuthorizationArtist
    updateAlbum(albumID: ID, albumData: AlbumInput): Album @AuthorizationArtist
    removeAlbum(albumID: ID): Album @AuthorizationArtist

    # CUD SONG
    addSong(songData: SongInput): Song @AuthorizationArtist
    updateSong(songID: ID, songData: SongInput): Song
    removeSong(songID: ID): Song
  }
`;

module.exports = typeDefs;
