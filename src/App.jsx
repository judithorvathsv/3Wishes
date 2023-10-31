import React, { useEffect, useState, useContext } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Routing from './components/Routing/Routing'
import {getUser, getJwt} from './services/userServices'
import setAuthToken from './utils/setAuthToken'
import {addToCartAPI, getCartAPI, removeFromCartAPI, increaseProductAPI,decreaseProductAPI} from './services/cartServices'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserContext from './context/UserContext'
import CartContext from './context/CartContext';


setAuthToken(getJwt())

const App = () => {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {     
      const jwtUser = getUser() 
      //exp time 1 hour 
      if(Date.now() >= jwtUser.exp * 1000){
        localStorage.removeItem("token")
        location.reload()
      }
      else{
        setUser(jwtUser)
      }     
    } catch (error) {
      
    }
  }, []);


  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id)

    if(productIndex === -1){
      updatedCart.push({product:product, quantity:quantity})
    }
    else{
      updatedCart[productIndex].quantity += quantity
    }  
    setCart(updatedCart);

    addToCartAPI(product._id, quantity)
    .then(() => {    
        toast.success("Product Added Succesfully!");
    })
    .catch((err) => {
      console.log(err)  
        toast.error("Failed to add product!");
        setCart(cart);
    });
  };

  const removeFromCart = (id) => {
    const oldCart = [...cart];
    const newCart = oldCart.filter((item) => item.product._id !== id);
    setCart(newCart);

    removeFromCartAPI(id).catch((err) => {
        toast.error("Something went wrong!");
        setCart(oldCart);
    });
  };

    /*increase / decrease quantity in cart*/
  const updateCart = (type, id) => {
    const oldCart = [...cart]
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === id)

    if(type === "increase"){
        updatedCart[productIndex].quantity += 1
        setCart(updatedCart)
        increaseProductAPI(id).catch( err=> {
          toast.error("Something went wrong!")})
          setCart(oldCart);
    }
    if(type === "decrease"){
        updatedCart[productIndex].quantity -= 1
        setCart(updatedCart)
        decreaseProductAPI(id).catch( err=> {
          toast.error("Something went wrong!")})
          setCart(oldCart);
    }
  }



  const getCart = () => {
    getCartAPI().then(res => {
      setCart(res.data);     
    }).catch( err=> {
      toast.error("Something went wrong!")
      setCart(cart);
    }) 
  };

  useEffect(() => {
    if(user){
      getCart()
    }  
  }, [user])

  return (
    <UserContext.Provider value={user}>
      <CartContext.Provider value={{cart, addToCart, removeFromCart, updateCart, setCart}}>
      <div className='app'>

          <Navbar /> 
      
          <main> 
            <ToastContainer position="bottom-right"/>
            <Routing />
          </main>

      </div>
      </CartContext.Provider>
    </UserContext.Provider>
  )
}

export default App

