import App from './app';
import OffersRoute from '@routes/offers.route';
import UsersRoute from '@routes/users.route';
import AuthsRoute from '@routes/auth.route';
import FilesRoute from '@routes/files.route';
import IndexRoute from '@/routes/index.route';

const app = new App([
  new OffersRoute(),
  new UsersRoute(),
  new AuthsRoute(),
  new FilesRoute(),
  new IndexRoute(),
]);

app.listen();
