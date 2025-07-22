import { useCallback, useMemo, useState } from 'react';

import useFetch from '@/hooks/useFetch';

import ListingList from '@/components/listing/ListingList';
import ListingFilters from '@/components/listing/ListingFilters';
import DataRenderer from '@/components/DataRenderer';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(
    () => ({
      params: filters,
    }),
    [filters],
  );

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer isLoading={isLoading} error={error}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;
