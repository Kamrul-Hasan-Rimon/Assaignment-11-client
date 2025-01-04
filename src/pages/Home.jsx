import React, { useEffect, useState } from 'react'
import Banner from '../components/Home/Banner'
import LocationMap from '../components/Home/LocationMap'
import FeaturedRooms from '../components/Home/FeaturedRooms'
import ExclusiveOffers from '../components/Home/ExclusiveOffers'
import GuestTestimonials from '../components/Home/GuestTestimonials'
import SpecialOffersModal from '../components/Home/SpecialOffersModal'

export default function Home() {

  // Optionally, you can set a timeout to automatically close the modal after a few seconds

  return (
    <>
      <Banner></Banner>
      {/* <LocationMap></LocationMap> */}
      <SpecialOffersModal></SpecialOffersModal>
      <FeaturedRooms></FeaturedRooms>
      <ExclusiveOffers></ExclusiveOffers>
      <GuestTestimonials></GuestTestimonials>
    </>
  )
}
