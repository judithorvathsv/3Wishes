import React from 'react'
import './Pagination.css'

const Pagination = ({totalPosts, postsPerPage, onClick, currentPage}) => {

    let pages = []

    /* totalProduct = 25, postPerPage = 8 -> Math.ceil(25/8) -> 4 pages*/
    for(let i = 1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i)
    }

  return (
    <>
    {
           pages.length > 1 && 
                <ul className='pagination'>
                    {pages.map((p) => (
                        <li key={p}>
                            <button 
                                className={
                                    parseInt(currentPage) === p ? 'pagination_button active': 'pagination_button'
                                }
                                onClick={() => onClick(p)}
                            >
                                {p}
                            </button>
                        </li>
                    ))}
                 </ul>
    }
    </>
  )
}

export default Pagination
