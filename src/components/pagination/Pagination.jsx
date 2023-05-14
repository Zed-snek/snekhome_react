import React, {useEffect, useState} from 'react';
import './pagination.css';


function Pagination(props) {

    return (
        <div className='paginationDiv'>
            {
                props.pagesArray.map( p =>
                    <button
                        onClick={() => props.onClick(p)}
                        key={p}
                        className={ props.currentPage === p ? 'pageButton currentPageButton' : 'pageButton'}
                    >
                        {p}
                    </button>
                )}

        </div>
    );
}

export default Pagination;