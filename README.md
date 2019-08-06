Guidelines for running the app.
1.execute npm install
2.ng serve --port=4300

Minimum requirements
1.Node version should be greater than 10

2. npm should be greater than 6.5

There is a dockerfile created for installing and running the app in a virtualbox.Please test once.as its a demo version but not tested.

DB schema to be as follows and scripts in createDbSetup.js file
its based on mongo database theory.
there will be three collections in a database
1.Movie-
id: string;
name: string;
date: Date;
releaseDate: Date;
plot: string;
poster: string;
actors: Actor[];
producers: Producer[];
editable: any;
2.Actor-
name: string;
sex: string;
dob: Date;
bio: string;
3.Producer-
name: string;
sex: string;
dob: Date;
bio: string;
