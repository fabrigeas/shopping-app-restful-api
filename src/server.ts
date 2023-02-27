import App from './app';
import OffersRoute from '@routes/offers.route';

const app = new App([new OffersRoute()]);

app.listen();
