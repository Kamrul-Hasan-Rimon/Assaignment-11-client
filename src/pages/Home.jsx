import React from 'react'
import Banner from '../components/Home/Banner'
import LocationMap from '../components/Home/LocationMap'
import FeaturedRooms from '../components/Home/FeaturedRooms'
import ExclusiveOffers from '../components/Home/ExclusiveOffers'
import GuestTestimonials from '../components/Home/GuestTestimonials'

export default function Home() {
  return (
    <>
      <Banner></Banner>
      {/* <LocationMap></LocationMap> */}
      <FeaturedRooms></FeaturedRooms>
      <ExclusiveOffers></ExclusiveOffers>
      <GuestTestimonials></GuestTestimonials>
    </>
  )
}
