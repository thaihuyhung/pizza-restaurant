import Loadable from 'react-loadable';

import LoadingIndicator from 'src/components/LoadableLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});