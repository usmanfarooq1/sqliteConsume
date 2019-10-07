# sqlliteConsume

Trying to write an ORM for the sqlite databases

#First Commit 
    In the first commit wrote a cli for the database in which you can create models from the database tables structures.
    By typing :  
              sqlite_cli -t "<path to local database file>" 
              path to the file can handle file extensions ".sqlite3" or ".db" other extension types not yet tested.
		
		Online files could also be used but not tested (in progress).
		Currently working on constraints [working on foreign keys and composite keys to be extracted from sqlite]


#Working
		pull or clone the repo and run commands
			npm install         { will install the dependencies }
			sudo npm install -g { will give you the access use the "sqlite_cli" command  }


#This command ("sqlite_cli")  will generate a folder Models and will generate seperate javascript files for all the tables from the given database in the form exporting objects from each file.
