import React from "react";
import Search from "./Search";
import SubmissionForm from "./SubmissionForm.js"

function Header({searchTerm, setSearchTerm, setSorted, isSorted}) {
  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search setSearchTerm = {setSearchTerm} searchTerm = {searchTerm} />
      <button onClick={()=>{setSorted((sorted)=>!sorted)}}>{isSorted? "sorted":"unsorted"}</button>
    </header>
  );
}

export default Header;
