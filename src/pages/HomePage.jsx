import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '@/hooks/useFetch';

import ListingList from '@/components/listing/ListingList';
import ListingFilters from '@/components/listing/ListingFilters';
import DataRenderer from '@/components/DataRenderer';
import { Separator } from '@/components/ui';
import { fetchListings } from '@/state/listings/listingsSlice';

const HomePage = () => {
  const { listings, error, status } = useSelector((state) => state.listings);
  const dispatch = useDispatch();

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

  // const {
  //   data: listings,
  //   error,
  //   isLoading,
  // } = useFetch('/api/listings', fetchOptions);

  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));
    return () => {
      request.abort();
    };
  }, [dispatch, fetchOptions]);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer isLoading={status === 'loading'} error={error}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;
