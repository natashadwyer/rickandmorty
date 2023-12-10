import { useState } from "react"
import { Axios } from "axios";

function SearchForm(props) {
  const [searchText , setSearchText] = useState('') ;

  function handleSubmit(e){
        e.preventDefault()
        console.log(e.target ,  searchText);
        // tell the parent when something happening
        props.onSearchSubmit(searchText)
  }
    
  return (
   <>
    <form id="submitSearch"  onSubmit={handleSubmit}>
        <input 
        type="text" 
        onChange={(e) =>  setSearchText(e.target.value)} ></input>
        <button>Search</button>
    </form>
    {/* <div>  {searchText}</div> */}
   </>
  )
}

export default SearchForm