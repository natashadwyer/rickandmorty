import { useState , useEffect } from "react";
import axios from 'axios';

const RICKANDMORTY_BASE_URL = 'https://rickandmortyapi.com/api/character';
//const RICKANDMORTY_API_KEY  = '2f5ac274ecfac5a455f38745704ad084';



function SearchResults(props) {

    const [ data, setPhotos ]     = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ]     = useState( null );
    

    useEffect(() => {
        loadSearchResults(props.searchText)
    }, [props.searchText])//second empty arg means 'run once on mount'


    function loadSearchResults(query){

        console.log('loadsearchResult()' , query)

       axios.get(`https://rickandmortyapi.com/api/character?page=${query}`)
            .then(response => {
                console.log(response.data.results);
                 setPhotos( response.data.results);
                 setLoading( false ); // finished loading!
              //this.renderSearchResults(res.data.photos.photo);
            })
            .catch(err => {
              console.warn('Error loading search results', err);
                 setError( err );
                 setLoading( false ); // finished loading!
              // TODO: message to user in the DOM
            });



    }///loads search results



    function newAxiosRequest(e){
        console.log(e.target.id)
        axios.get(`https://rickandmortyapi.com/api/character/${e.target.id}`)
        .then(response =>  console.log(response.data))
        .catch(err => console.warn(err))
    }


 if(error){return <b>there is an error loading your page or character</b>}
  return (
    <div>
      <p>results {props.searchText}</p> 
        
        {
            loading 
            ? <p>loading ........</p>
            :  <>
            <ul className="ulListRickAndMorty" style={{ listStyleType: 'none' }}>
              {data.map(e => (
                <div key={e.id} className="containerChar">
                  <li>
                    <p>{e.name}</p>
                  <span><small>{e.species}</small></span>  
                  <a href="#">  <img 
                  src={e.image} 
                  alt={e.name} 
                  id={e.id} 
                  onClick={newAxiosRequest}
                  />  </a> 
                  </li>
                </div>
              ))}
            </ul> 
        
          </>
        }
        
        </div>
  )
}

export default SearchResults;