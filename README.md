Test from Matteo Bombelli to Cosuno

## run the test:

### install dependencies

befpre starting it ois better to install dependencies

```bash
npm ci
```

### run the test in dev mode

to run the test in dev mode run

```bash
npm run dev
```

if preferred, it is also possible to run the test in prod mode:

```bash
npm run build
```

and then

```bash
npm run start
```

## Exercise version

due to responses there are two versions of the test:

* be-filtering-graphql
* be-filtering
* react-filtering

### be-filtering

version with filtering and 

### react-filtering

old version with filtering done ony through frontend

## file positions

due to nextjs it is possible to see:

* "react pages" inside `./pages` folder
* node.js implementation inside `./pages/api` folder

other directories:
* `./components` contains components and styles related to them inside scss modules
* `./sharedTypes` contains types shared across fe and backend
* `./api` contains files with frontend api to connect to the backend
* `./data` contains jsons wth the data to pass to the frontend
* `./styles` constains styles shared across components
* `./utils` functions shared between fe and be (actually the filtering function based on possible inputs)

## suggested improvements: 

suggested improvements: 

* using rem instead of px
* internazionalization
* dockerization
* debouncing calls to the backend
