import React from 'react';

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const totalPagesToShow = 6;
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
    let startPage = currentPage - halfTotalPagesToShow;
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + totalPagesToShow - 1, nPages);

    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link" onClick={prevPage} href='#'>Previous</a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} className={`page-item ${currentPage === pgNumber ? 'active' : ''}`}>
                        <a onClick={() => setCurrentPage(pgNumber)} className='page-link' href='#'>{pgNumber}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link" onClick={nextPage} href='#'>Next</a>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
