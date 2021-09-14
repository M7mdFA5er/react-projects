import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  return (
    <section className="section">
      <form className="search-form">
        <div className="form-control">
          <input
            type="text"
            name="searchInput"
            id="searchInput"
            // onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input" />
        </div>
      </form>
    </section>
  )
}

export default SearchForm
