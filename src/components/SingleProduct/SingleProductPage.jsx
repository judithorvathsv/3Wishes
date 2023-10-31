import React, {useState, useContext} from 'react'
import './SingleProductPage.css'
import QuantityInput from './QuantityInput'
import useData from '../../hooks/useData'
import { useParams } from 'react-router-dom'
import Loader from '../Common/Loader'
import CartContext from '../../context/CartContext';
import UserContext from "../../context/UserContext";
import config from '../../config.json'


const SingleProductPage = () => {
  const[selectedImage, setSelectedImage] = useState(0);
  const[quantity, setQuantity] = useState(1);
  const {id} = useParams()
  const {data: product, error, isLoading} = useData(`/products/${id}`)
  const {addToCart} = useContext(CartContext)
  const user = useContext(UserContext)

  return (
    <section className='align_center single_product'>
      {error && <em className='form_error'>{error}</em>}
      {isLoading && <Loader/>}
      {product && (
      <>
        <div className="align_center">
          <div className="singe_product_thumbnails">
              {
                  product.images.map((image, index)=> (
                      /* <img src={`http://localhost:5000/products/${image}`} alt={product.title}  */
                      <img src={`${config.backendURL}/products/${image}`} alt={product.title} 
                        className={selectedImage === index ? 'selected_image' : ''}
                        onClick={() => setSelectedImage(index)}
                      />
                  ))
              }
        </div>  
        {/* <img src={`http://localhost:5000/products/${product.images[selectedImage]}`}  */}
        <img src={`${config.backendURL}/products/${product.images[selectedImage]}`} 
              alt={product.title} className='single_product_display'/>

        </div>

        <div className="single_product_details">

          <h1 className="single_product_title">{product.title}</h1>
          <p className="single_product_description">{product.description}</p>
          <p className="single_product_price">${product.price.toFixed(2)}</p>

        {user && <>
          <h1 className="quantity_title">Quantity:</h1>
          <div className="align_center quantity_input">
              <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock}/>
          </div>

          <button className="search_button add_cart" onClick={() => addToCart(product, quantity)}>Add to Cart</button>
        </>}

        </div>
        </>
        )}
    </section>
  )
}

export default SingleProductPage
