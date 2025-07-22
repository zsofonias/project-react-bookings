import { useParams, useNavigate } from 'react-router-dom';

import useFetch from '@/hooks/useFetch';

import DataRenderer from '@/components/DataRenderer';
import ListingDetailsCard from '@/components/listing/ListingDetailsCard';
import { Button } from '@/components/ui';

const ListingDetailsPage = () => {
  const { listingId } = useParams();
  const navigate = useNavigate();

  const {
    data: listing,
    error,
    isLoading,
  } = useFetch(`/api/listings/${listingId}`);

  return (
    <div className='container py-4'>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        {/* <Link to='/'>Back to Home</Link> */}
        Back to Home
      </Button>
      <DataRenderer isLoading={isLoading} error={error}>
        <ListingDetailsCard listing={listing} />
      </DataRenderer>
    </div>
  );
};

export default ListingDetailsPage;
