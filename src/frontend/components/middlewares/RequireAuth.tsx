import { useEffect } from 'react';
import { useMeQuery } from '../../generated/graphql';
import { useRouter } from '../../utils/hooks/useRouter';

const RequireAuth = () => {
  const router = useRouter();
  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (
      !(router.pathname === '/sign-in' || router.pathname === '/sign-up') &&
      !data?.me &&
      !loading
    ) {
      router.push('/sign-in');
    }
  }, [router.pathname, loading, data]);
  return null;
};

export default RequireAuth;
