const DisplayPhotos = ({ photos }) => {
  return(
    <section>
      {
        photos.length === 0 
        ? <h2>no Photos found</h2> 
        : (
          <>
            <h2>Puppy photos</h2>
            <div className="photos">
              {photos.map( photo => {
                return (
                  <div key={photo.id} className='photo-container'>
                    <img src={photo.urls.small} alt={photo.alt_description} />
                  </div>
                )
              })}
            </div>
          </>
        )
      }
    </section>
  )
}

export default DisplayPhotos;