import dva from 'dva';
import router from './router';

const app = dva();
// app.model(require('./models'));
app.router(router);
app.start('#root');
