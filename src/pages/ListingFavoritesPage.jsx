import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import ListingList from '@/components/listing/ListingList';

const ListingFavoritesPage = () => {
  const { listings, favoriteListingIds } = useSelector(
    (state) => state.listings,
  );

  const favoriteListings = useMemo(
    () => listings.filter((listing) => favoriteListingIds.includes(listing.id)),
    [listings, favoriteListingIds],
  );

  return (
    <div className='container py-4'>
      <ListingList listings={favoriteListings} />
    </div>
  );
};

export default ListingFavoritesPage;
