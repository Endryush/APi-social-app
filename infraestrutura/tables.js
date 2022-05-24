class Tables {
    init(connection) {
        this.connection = connection

        this.createTables()
    }

    createTables() {

        const tables = [
            { table: 'profiles', sql: 'CREATE TABLE IF NOT EXISTS profiles (id int NOT NULL AUTO_INCREMENT, username varchar(50) NOT NULL, photo text, status varchar(20) NOT NULL, biography text, PRIMARY KEY(id))'},
            { table: 'accounts', sql: 'CREATE TABLE IF NOT EXISTS account (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, email varchar(50) NOT NULL, password text NOT NULL, phone varchar(20) ,registration_date datetime NOT NULL, active TINYINT(1), profileID INT, PRIMARY KEY(id), FOREIGN KEY (profileID) REFERENCES profiles(id))' },
        ]

        for (var i = 0; i < tables.length; i++) {
            this.connection.query(tables[i].sql, erro => {
                if (erro) {
                    console.log(erro)
                }
            })
        }

    }
}

module.exports = new Tables