import App from '@/app';
import MoodsRoute from '@routes/moods.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new MoodsRoute()]);

app.listen();
