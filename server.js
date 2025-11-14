import jsonServer from 'json-server';
import cors from 'cors';

const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(jsonServer.defaults());
app.use(router);

app.listen(3001, () => console.log('✅ API corriendo sin auth en http://localhost:3001'));
