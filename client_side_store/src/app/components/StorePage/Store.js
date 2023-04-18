import React, { useState } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";
import SubmissionForm from "./SubmissionForm";


function Store() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isSorted, setSorted] = useState(false)
  const [gregsListings, setGregsListings] = useState([]);

  return (
    <div className="app">
      <Header setSearchTerm = {setSearchTerm} searchTerm = {searchTerm} setSorted = {setSorted} isSorted = {isSorted}/>
      <SubmissionForm setGregsListings = {setGregsListings} gregsListings = {gregsListings}></SubmissionForm>
      <ListingsContainer gregsListings={gregsListings} setGregsListings = {setGregsListings} searchTerm={searchTerm} isSorted = {isSorted} />
    </div>
  );
}

export default Store;
