import { Route, RouteProps, useHistory } from 'react-router-dom';
import { History } from 'history';
import { FC, useEffect } from 'react';
import { getUser } from '../services/localStorage/localStorage';

interface TrackedRouteProps extends RouteProps {
  title?: string;
  isProtected?: boolean;
}

const onTitleChangedSetDocumentTitleWith = (title?: string) => {
  return () => {
    const pageTitle = `HotPlay ${((title) ? ` - ${title}` : '')}`;
    const envSuffix = ['production', 'prod'].includes(process.env.REACT_APP_ENV || '') === true
      ? '' : ` (${process.env.REACT_APP_ENV})`;

    document.title = `${pageTitle}${envSuffix}`;
  }
}

const onNonUserAccessWith = (history: History, localStorageUser: string | null, isProtected?: boolean) => {
  return () => {
    if (isProtected && !localStorageUser) {
      history.push('/welcome');
    }
  }
}

export const TrackedRoute: FC<TrackedRouteProps> = ({ ...props }) => {
  const history = useHistory();
  const onTitleChangedSetDocumentTitle = onTitleChangedSetDocumentTitleWith(props.title);

  useEffect(onTitleChangedSetDocumentTitle, [onTitleChangedSetDocumentTitle]);

  const onNonUserAccess = onNonUserAccessWith(history, getUser(), props.isProtected);

  useEffect(onNonUserAccess, [onNonUserAccess]);

  return <Route {...props} />;
}