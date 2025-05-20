import { useParams } from 'react-router-dom';

import useFetch from '@/hooks/useFetch';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/listing/ListingDetailsCard';

const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(`/api/listings/${listingId}`);

  return (
    <div className='container py-4'>
      <DataRenderer isLoading={isLoading} error={error}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
