import VendorList from "@/pages/matt_components/VendorList";

export default function App({items, vendors, species, vehicles}){

    return <VendorList items = {items} vendors = {vendors} species = {species} vehicles = {vehicles}/>
}