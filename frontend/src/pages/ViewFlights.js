import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';
import Loading from '../components/Loading';
import Nav2 from '../components/Nav2';
import Footer from '../components/Footer';
import SearchForm from '../components/SearchForm';

function ViewFlights({ setViewFlightData, viewFlightData, setBookFlightData }) {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5); // Number of flights per page

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    // Calculate the current flights to display based on pagination
    const indexOfLastFlight = currentPage * pageSize;
    const indexOfFirstFlight = indexOfLastFlight - pageSize;
    const currentFlights = viewFlightData.slice(indexOfFirstFlight, indexOfLastFlight);

    // Function to handle click for previous page
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle click for next page
    const nextPage = () => {
        if (currentPage < Math.ceil(viewFlightData.length / pageSize)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div className={isLoading ? 'loading' : 'loaded'}>
                <Loading isLoading={isLoading} />
                <div className="content_">
                    <Navbar />
                    <Nav2>Flight Listing</Nav2>
                    <SearchForm setViewFlightData={setViewFlightData} />
                    <div className='bg-slate-100'>
                        <div className='h-[50px]'></div>
                        <div>
                            {
                                currentFlights.map((flightData) => (
                                    <FlightCard key={flightData.id} flightData={flightData} setBookFlightData={setBookFlightData} />
                                ))
                            }
                        </div>
                        <div className='h-[50px]'></div>
                        {/* Pagination controls */}
                        <div className="pagination flex justify-center gap-4 pb-10">
                            <button onClick={prevPage} disabled={currentPage === 1} className="page-link inline text-white rounded text-l mt-6 font-bold p-2 sm:w-[6rem] transition duration-500 ease-in-out bg-blue-600 hover:bg-slate-300 hover:text-black">
                                Prev
                            </button>
                            <span className="page-link inline text-white rounded text-xl mt-6 font-bold p-3 sm:w-[2rem] transition duration-500 ease-in-out bg-blue-600 hover:bg-slate-300 hover:text-black">{currentPage}</span>
                            <button onClick={nextPage} disabled={currentPage === Math.ceil(viewFlightData.length / pageSize)} className="page-link inline text-white rounded text-l mt-6 font-bold p-2 sm:w-[6rem] transition duration-500 ease-in-out bg-blue-600 hover:bg-slate-300 hover:text-black">
                                Next
                            </button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default ViewFlights;
