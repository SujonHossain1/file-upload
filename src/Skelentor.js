import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const Skeleton = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch('https://jsonplaceholder.typicode.com/photos')
            const resData = await res.json();
            setData(resData);
            setLoading(false);
        };
        fetchData();
    }, [])
    return (
        <div className="container">
            <div className="row">
                {
                    loading ? <Loader data={data} key={data.id} /> : data.map(item =>
                        <div className="col-md-4">
                            <div className="card" key={item.id}>
                                <h5> {item.title} </h5>
                                <img src={item.url} alt="" className="card-img-top img-fluid" />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Skeleton;