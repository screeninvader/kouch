outta_space
====

#What does this app do?
This application builds all files in the src directory and creates
a distributable.
vulcanized allows to additionally preback everything as one bundle

```bash
#fastest way to get the environment running:
git clone https://github.com/jaeh/outta_space
cd outta_space
./bin/install
./bin/build
./bin/server
xdg-open http://localhost:1337/vulcanized
```

```bash
#clone git repository
git clone https://github.com/jaeh/outta_space 
cd outta_space
```

```bash
#INSTALL: used once before building for the very first time
#google font, npm and bower modules
./bin/install
```

```bash
#BUILD: adds local changes to dist directory
#creates dist/index.html and dist/vulcanized.html
./bin/build
```

```bash
#SERVER
#run the compiled version of the app from dist/index.html
#and serve all static files in that directory
bin/server
```
