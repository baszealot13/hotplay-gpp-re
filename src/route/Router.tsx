import { Switch, useHistory, useLocation } from 'react-router-dom';
import loadable from '@loadable/component';
import { TrackedRoute } from './TrackedRoute';

interface IAuth {
  user: string | null;
  publisherId: number;
}

export function RouterController() {
  const history = useHistory();
  const auth: IAuth = {
    user: null,
    publisherId: 0
  };

  return !auth.user ||
    auth.publisherId === 0 ? (
      <>
        <Switch>
          <TrackedRoute exact path={['/signin', '/login']} component={Signin} title="Sign in" />
          <TrackedRoute exact path={['/welcome']} component={Welcome} title="Welcome" />
          <TrackedRoute exact path={['/redirect']} component={RedirectComponent} />
        </Switch>
      </>
    ):(
      <></>
    )
}