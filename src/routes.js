import React, { Suspense } from 'react';
import Loader from './components/Loader';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

const routeList = [
    {
        path: '/',
        exact: true,
        component: React.lazy(() => import('./pages/Home'))
    },
    {
        path: '/exemple',
        exact: false,
        component: React.lazy(() => import('./pages/Exemple'))
    },
]

const Routes = () => (
    <Suspense fallback={<Loader/>}> 
        <BrowserRouter basename="/">
            <Switch>
                {routeList.map((route, key) => {
                    return <Route key={key} exact={route.exact} path={route.path} component={route.component}/>
                })}
            </Switch>
        </BrowserRouter>
    </Suspense>
)

export default Routes