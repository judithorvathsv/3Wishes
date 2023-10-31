import React, { useContext } from 'react'
import './MyOrderPage.css'
import Table from '../Common/Table'
import useData from "../../hooks/useData";
import Loader from "../Common/Loader.jsx";
import UserContext from "../../context/UserContext";


const MyOrderPage = () => {
  const {data: orders, error, isLoading} = useData("/order")
  const user = useContext(UserContext)

  const getProductString = (order) => {
    const productStringArray = order.products.map(p => `${p.product.title} (${p.quantity})`)
    return productStringArray.join(", ")
  }

  return (
    <section className='align_center myorder_page'>

      <div className="align_center user_info">
        <img src={`http://localhost:5000/profile/${user?.profilePic}`} alt="user profile" />
        <div>
            <p className="user_name">Name: {user?.name}</p>
            <p className="user_email">Email: {user?.email}</p>
        </div>
      </div>
     
      {isLoading && <Loader />}

      {error && <em className='form_error'>{error}</em>}

      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                  <td>{index+1}</td>
                  <td>{getProductString(order)}</td>
                  <td>${order.total}</td>
                  <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

    </section>
  )
}

export default MyOrderPage
