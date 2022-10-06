import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Content() {

    const [itemList, setItemlist] = useState([]);
    const [menu, setMenu] = useState();

    useEffect(() => {

        getItems();

        // const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
        // fetch(url)
        //     .then((resp) => resp.json())
        //     .then((resp) => setItemlist(resp.drinks));

    }, [])

    const getItems = async () => {
        let result = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita");
        result = await result.json();
        setItemlist(result.drinks)
        setMenu(result.drinks);
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${key}`);
            result = await result.json();
            if (result) {
                setItemlist(result.drinks);
            }
        } else {
            getItems();
        }
    }

    const filterItem = (categoryy) => {
        const update = menu.filter((e) => {
            if (e.strCategory == categoryy) {
                return e;
            }
        })
        setItemlist(update);
    }


    return (
        <div className='main_container'>
            <div className='bg-white'>
                <div className='image_header flex justify-center bg-gradient-to-t from-gray-400'>
                    <div className=''>
                        <img style={{ width: "559px", height: "300px" }} alt="header-image" src='https://d256f9amacs3r.cloudfront.net/covers/3bd8570f2d74094c_Screen-Shot-2021-03-10-at-3.08.11-PM.png' alt='pimage' />
                    </div>
                </div>
            </div>
            <div className='sub_container w-screen flex flex-row h-screen'>

                <div className='left_container w-2/5 ml-10'>
                    <div className='left_sub_container sticky top-12 bg-white shadow-xl rounded-xl w-full h-1/2  mt-10 justify-center'>
                        <div className='header_menu p-4 rounded bg-white shadow-xl border-b-2'>
                            <div className='bg-white-900'><h5 className='bg-white'>Menu</h5></div>
                        </div>
                        <div onClick={getItems} className='menu_items p-4 rounded bg-white hover:bg-blue-600 hover:cursor-pointer'>
                            All
                        </div>
                        <div onClick={() => filterItem('Ordinary Drink')} className='menu_items p-4 rounded bg-white hover:bg-blue-600 hover:cursor-pointer'>
                            Ordinary Drink
                        </div>
                        <div onClick={() => filterItem('Cocktail')} className='menu_items p-4 rounded bg-white hover:bg-blue-600 hover:cursor-pointer'>
                            Cocktail
                        </div>
                        <div onClick={() => filterItem('Other\/Unknown')} className='menu_items p-4 rounded bg-white hover:bg-blue-600 hover:cursor-pointer'>
                            Other\/Unknown
                        </div>
                    </div>
                </div>


                {/* ------- */}

                <div className='right_container w-full h-screen ml-10'>
                    <div className="mt-10 mr-72 w-10/12 rounded shadow-xl ">
                        <div className="flex border-2 rounded bg-blue-900  ">

                            <input onChange={searchHandle} type="text" className="bg-white px-4 py-2 w-full rounded" placeholder="Search your favourite items..." />
                            <button className="flex items-center justify-center px-4 border-r rounded">
                                <svg className="w-6 h-6 text-white bg-blue-900" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* content part */}

                    {
                        itemList.length > 0 ? (
                            itemList.map((item, i) => (
                                <>
                                    <Link to={`/order/` + item.idDrink} >
                                        <div key={item.idDrink} className='main_cocktail_items mt-11 bg-white rounded-2xl shadow-xl w-10/12 hover:cursor-pointer '>
                                            <div className='cocktail_items flex flex-row bg-white p-2 '>
                                                <div className='cocktail_image p-2 bg-white'>
                                                    <img className='rounded' style={{ width: "60px", height: "60px" }} alt="cocktail-image" src={item.strDrinkThumb} />
                                                </div>
                                                <div className='cocktail_name ml-4 bg-white'>
                                                    <div className='p-2 bg-white'>
                                                        <h1 className='bg-white font-bold font-sans'>{item.strDrink}</h1>
                                                        <p className='bg-white text-gray-600 text-sm font-sans'>{item.strTags}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </>
                            ))
                        ) : (
                            <h1>Empty Dashboards</h1>
                        )

                    }

                </div>
            </div>
        </div>
    )
}

export default Content