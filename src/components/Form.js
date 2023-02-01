import { useState } from "react";

const Form = ({handleSubmit}) => {
  const [userChoice, setUserChoice] = useState('');

  const handleChange = (e) => {
    setUserChoice(e.target.value);
  }

  /* since we cannot communicate between Form component directly to DisplayPhotos,
  we send the handleSubmit function to the parent, and hand it down here to the form by props. Thus, we can listen to form handleSubmit to have the input from form in the App.js, and use that handleSubmit to trigger a new DisplayPhotos with proper orientation */


  return (
    /* in lecture handleSubmit is getPhotos function */
    <form onSubmit={ e => {
      e.preventDefault();
      handleSubmit(userChoice);
    }}>
      <label htmlFor="orientationPicker">Choose photo orientation:</label>
      <select 
        value={userChoice} 
        id="orientationPicker" 
        onChange={handleChange}
      >
        <option value="" disabled>select</option>
        <option value="square">Square</option>
        <option value="landscape">Landscape</option>
        <option value="portrait">Portrait</option>
      </select>

      <button type="submit">Get the photos</button>
    </form>
  )
}

export default Form;