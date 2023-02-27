import App from './app';
import OffersRoute from '@routes/offers.route';
import UsersRoute from '@routes/users.route';
import AuthsRoute from '@routes/auth.route';

const app = new App([new OffersRoute(), new UsersRoute(), new AuthsRoute()]);

app.listen();
