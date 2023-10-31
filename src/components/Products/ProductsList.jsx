import React, { useEffect, useState } from "react";
import './ProductsList.css'
import ProductCard from './ProductCard'
import useData from "../../hooks/useData";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
import Pagination from '../Common/Pagination';

const ProductsList = () => {

  const [page, setPage] = useState(1)
  // products?category=
  //dependencyArray = category in UseData.js
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const searchQuery = search.get("search")
  const [sortBy, setSortBy] = useState("")
  const [sortedProducts, setSortedProducts] = useState([])

/*   const page = search.get("page"); */
  const { data, error, isLoading } = useData(
                                          "/products", 
                                          {params: 
                                              {
                                                search:searchQuery,
                                                category: category,
                                                perPage:10,
                                                page: page,
                                              }
                                          }, [searchQuery, category, page]
                                      );

  useEffect (() => {
    setPage(1)  
 }, [searchQuery, category])  

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  //pagination method
  const handlePageChange = page => {
    const currentParams = Object.fromEntries([...search]) 
    /* setSearch({...currentParams, page:page}) */
    setSearch({...currentParams, page:parseInt(currentParams.page +1)})
  } 

useEffect(() => {
  const handleScroll = () => {
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;

    if((scrollTop + clientHeight) >= scrollHeight -1 && !isLoading && data && (page < data.totalPages)){      
      handlePageChange()
      setPage(prev => prev +1)
    }

  }
  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}, [isLoading, data])


useEffect(() => {
  if(data && data.products){
    const products = [...data.products]

    if(sortBy === "price desc"){
      setSortedProducts(products.sort((a, b) => b.price - a.price))
    }
    else if(sortBy === "price asc"){
      setSortedProducts(products.sort((a, b) => a.price - b.price))
    }

    else if(sortBy === "rate desc"){
      setSortedProducts(products.sort((a, b) => b.reviews.rate - a.reviews.rate))
    }
    else if(sortBy === "rate asc"){
      setSortedProducts(products.sort((a, b) => a.reviews.rate - b.reviews.rate))
    }
    else{
      setSortedProducts(products)
    }
  }
}, [sortBy, data])

  return (
    <section className="products_list_section">
        <header className="products_list_header align_center">
            <h2>Products</h2>

            <select name="sort" id="" className='products_sorting' onChange={e=>setSortBy(e.target.value)}>
                <option value="">Relevance</option>

                <option value="price desc">Price High to Low</option>
                <option value="price asc">Price Low to High</option>

                <option value="rate desc">Rate High to Low</option>
                <option value="rate asc">Rate Low to High</option>
            </select>
        </header>

        <div className="products_list">
            {error && <em className='form_error'>{error}</em>}

            {data?.products && sortedProducts.map((product)=> 
                                (<ProductCard 
                                      key={product._id} 
                                      product={product}
/*                                       id={p._id} 
                                      image={p.images[0]} 
                                      price={p.price} 
                                      title={p.title} 
                                      rating={p.reviews.rate} 
                                      ratingCounts={p.reviews.counts} 
                                      stock={p.stock}  */
                                  />)
              )}

            {isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}

        </div>
      
      {/* pagination */}
{/*         {data && <Pagination
                            totalPosts={data.totalProducts}
                            postsPerPage={8}
                            onClick={handlePageChange}
                            currentPage={page}
                />           
        }  */}

   </section>
  )
}

export default ProductsList
