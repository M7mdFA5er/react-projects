import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import { usePagination } from './usePagination'
import Follower from './Follower'
function App() {

  const { loading, data } = useFetch();
  const itemsPrePage = 10;
  const { next, previous, jump, currentPage, currentPageData, maxPage } = usePagination(data, itemsPrePage);

  const pages = [...Array(itemsPrePage)];

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? 'loading ....' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {
            currentPageData.map((follower) => {
              return <Follower key={follower.id} {...follower} />
            })
          }
        </div>
        {
          !loading && <div className='btn-container'>
            <button className='prev-btn' onClick={previous}>prev</button>
            {pages.map((item, index) => {
              return <button
                key={index}
                onClick={() => jump(index + 1)}
                className={`page-btn ${(index + 1) === currentPage ? 'active-btn' : null}`}
              >
                {index + 1}
              </button>
            })}

            <button className='next-btn' onClick={next}>next</button>
          </div>
        }
      </section>
    </main>
  )
}



export default App
