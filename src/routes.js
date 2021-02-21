import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import HomeView from './views/home/HomeView';
import LoadingScreen from './components/LoadingScreen';
import AuthGuard from './components/Guards/AuthGuard';
import AdminGuard from './components/Guards/AdminGuard';
import GuestGuard from './components/Guards/GuestGuard';
import PremiumUserGuard from './components/Guards/PremiumGuard';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('./views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('./views/auth/RegisterView'))
  },
 
  {
    path: '/admin',
    guard: AdminGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/admin/exams',
        component: lazy(() => import('src/views/Admin/ExamListView'))
      },
      {
        exact: true,
        path: '/admin/exams/create',
        component: lazy(() => import('src/views/Admin/ExamCreateView'))
      },
      {
        exact: true,
        path: '/admin/exams/edit/:examId',
        component: lazy(() => import('src/views/Admin/ExamEditView'))
      },
      {
        exact: true,
        path: '/admin/dictionary/create',
        component: lazy(() => import('src/views/Admin/Dictionary/CreateView'))
      },
      {
        exact: true,
        path: '/admin/dictionary/edit/:entryId',
        component: lazy(() => import('src/views/Admin/Dictionary/EditView'))
      },
      {
        exact: true,
        path: '/admin/dictionary',
        component: lazy(() => import('src/views/Admin/Dictionary/ListView'))
      }
    ]
  },
  {
    path: '/app/checkout',
    guard: PremiumUserGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/checkout',
        component: lazy(() => import('src/views/checkout/CheckoutView'))
      }
    ]
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
    
      {
        exact: true,
        path: '/app/dashboard',
        component: lazy(() => import('./views/user/Dashboard'))
      },
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/dashboard" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },

  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/',
        component: HomeView
      },
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pricing/PricingView'))
      },
      {
        exact: true,
        path: '/about',
        component: lazy(() => import('src/views/home/HomeView/About'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

export default routes;
