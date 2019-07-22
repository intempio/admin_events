import union from 'lodash.union'
import {PERMS} from '../const/permissions';

export default function ({app, route, redirect}) {
  if ((route.path !== '/callback' && route.path !== '/login') && !app.router.app.$auth.isAuthenticated()) {
    redirect('/login');
    return;
  }

  const routePath = route['fullPath'].slice(1);
  const pathName = routePath.slice(0, routePath.indexOf('/'));

  if (guardedRoutes.includes(pathName)) {
    const roles = JSON.parse(localStorage.getItem('user_roles'));
    if (roles) {
      const allPerms = roles.reduce((p, c) => union(p, PERMS[c]), []);
      if (!allPerms.includes(pathName)) {
        redirect('/forbidden');
      }
    }
  }
}

const guardedRoutes = ['admin', 'products', 'people'];

