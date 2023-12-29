import React from 'react'
import "../Admin/Admin.css"

const SearchResultsList = ({results}) => {
  return (
    <div className='result-list'>
        {
            results.map((result, id)=>{
                return<div key={id}>{result.first_name}</div>
            })
        }
        
    </div>
  )
}

export default SearchResultsList