import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
function Description() {
    const [itemDetails, setItemDetails] = useState([]);
    let { idDrink } = useParams();

    useEffect(() => {

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
          .then((resp) => resp.json())
          .then((resp) =>setItemDetails(resp.drinks[0]));
          
    
      }, [])

  return (
    <div className='main_container'>
        <div className='sub_container flex bg-white rounded-2xl shadow-xl m-20'>
            <div className='item_image w-2/5 ml-10 bg-white p-10'>
            <img style={{ width: "559px", height: "300px" }} src={itemDetails.strDrinkThumb} />
            </div>
            <div className='item_description bg-white p-10'>
                <h1 className='bg-white font-bold font-sans'>{itemDetails.strDrink}</h1>
                <p className='bg-white font-sans font-medium text-gray-600'>{itemDetails.strInstructions}</p>
            </div>
        </div>
        <div className='flex justify-center'>
           <Link to="/"><button className='bg-blue-900 w-24 p-2 text-center text-white rounded-xl hover:cursor-pointer'>Home</button></Link>
        </div>
    </div>
  )
}

export default Description