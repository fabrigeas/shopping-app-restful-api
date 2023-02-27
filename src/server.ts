import App from './app';
import OffersRoute from '@routes/offers.route';
import UsersRoute from '@routes/users.route';

const app = new App([new OffersRoute(), new UsersRoute()]);

app.listen();
