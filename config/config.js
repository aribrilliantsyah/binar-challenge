module.exports = {
    "development": {
        "username": "postgres",
        "password": "postgres",
        "database": "db_binar_challenge",
        "host": "localhost",
        "dialect": "postgres",
        "port": "5432"
    },
    "test": {
        "username": "postgres",
        "password": "postgres",
        "database": "db_binar_challenge",
        "host": "localhost",
        "dialect": "postgres",
        "port": "5432",
        "logging": false
    },
    "production": {
        "use_env_variable": "DATABASE_URL",
        "dialectOptions": {
            "ssl": { 
                "require": true,
                "rejectUnauthorized": false
            }
        }
    }
};
    