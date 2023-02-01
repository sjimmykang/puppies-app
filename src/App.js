import DisplayPhotos from './components/DisplayPhotos';
import Form from './components/Form';

import { useEffect, useState } from 'react';
import './App.css';

function App() {
  /* state items first */
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  /* hook into the first/initial render of the app to fetch puppy photos */
  useEffect( () => {
    /* query the api, [] to use just once upon pageLoad */
    const fetchData = async () => {
      const url = new URL('https://api.unsplash.com/search/photos');
      /* URLSearchParams takes in the object */
      url.search = new URLSearchParams({
        client_id: '-7p-CTvWOez2W-P78tfU3W2llUfZw5OVkm4oGScv39U',
        query: 'puppies',
        per_page: 30,
      });

      try {
        const data = await fetch(url);
        const response = await data.json();
        // console.log(response.results);

        /* photo orientation filtering */
        const photosWithOrientation = response.results.map( photo => {
          /* you can do photo.width > photo.height and just check that way too */
          const ratio = photo.width / photo.height;
          let orientation = 'square';

          /* because these are images we are filtering them on not perfection, we filter them by which category its closer to ratio wise */
          if (ratio < 0.75) {
            orientation = 'portrait';
          } else if (ratio > 1.35) {
            orientation = 'landscape';
          }
          // console.log(photo);
          // update each photo object to now include orientation property
          // photo['orientation'] = orientation;
          // return(photo);
          /* but you do not want to mutate the original copy if possible */

          // or
          return {
            ...photo,
            orientation: orientation
            /* anytime key and value has same name, you can just do below line

            orientation
             same as orientation: orientation */
          }

        })
        // console.log(photosWithOrientation);
        
        setPhotos(photosWithOrientation);

      } catch (err) {
        /* err handling */
      }
    }

    fetchData();
  }, []);

  /* const getPhotos in the lecture */
  const handleSubmit = userChoice => {
    /* moved e.preventDefault() because it doesnt make sense when you see the function in the App.js although its needed in the Form.js */
    // e.preventDefault();
    // console.log('form subbed');
    // console.log(userChoice);

    /* Thus, now userChoice from the Form is carried over onto the App.js, which we can pass to the DisplayPhotos */

    /* update DisplayPHotos with images now based on user's chosen orientation */

    /* in jsx, once filter requirement meets true, it will return itself, the photo object itself in this case. Thus w.e all that meets true is saved as an array in whole into the filteredPhotos  */
    const newFilteredPhotos = photos.filter( photo => photo.orientation === userChoice)
    // console.log(filteredPhotos);
    setFilteredPhotos(newFilteredPhotos);

    // const tester01 = "function scope tester01";
    
    /* dont do this because this will mutate our fetch data that we may need later when user changes the filter orientation */
    // setPhotos(filteredPhotos);

  }

  return (
    <div className="App">
      <h1>puppies app</h1>
      <Form handleSubmit={handleSubmit} />
      <DisplayPhotos photos={filteredPhotos}/>
    </div>
  );
}

export default App;

/* key: -7p-CTvWOez2W-P78tfU3W2llUfZw5OVkm4oGScv39U */