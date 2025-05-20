import { useState } from 'react';

import {
  listings as staticListings,
  isListingAvailable,
} from '@/api/data/listings';

import ListingList from '@/components/listing/ListingList';
import { Separator } from '@/components/ui';
import ListingFilters from '@/components/listing/ListingFilters';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  const handleFilters = (filters) => {
    const { dates, guests, search } = filters;

    let filteredListings = staticListings;
    if (dates) {
      filteredListings = filteredListings.filter((listing) =>
        isListingAvailable(listing, dates),
      );
    }
    if (guests) {
      filteredListings = filteredListings.filter(
        (listing) => listing.maxGuests >= guests,
      );
    }
    if (search) {
      filteredListings = filteredListings.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setListings(filteredListings);
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;
