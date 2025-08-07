const config = {
    development: {
        //url to be used in link generation
        url: 'http://127.0.0.1/',
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:     'vibin',
            user: encodeURIComponent("root"),
            pwd: encodeURIComponent("dungeon@[2015H]")
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '8081'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://127.0.0.1/',
        //mongodb connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:     'vibin',
            user: encodeURIComponent("root"),
            pwd: encodeURIComponent("dungeon@[2015H]")
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '8081'
        }
    }
};
module.exports = config;
