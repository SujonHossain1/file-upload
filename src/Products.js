import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import ProductItem from './ProductItem';


const Products = ({ handleUpdateProduct }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        const getDataFormDB = async () => {

            const res = await fetch('http://localhost:4000/api/products');
            const data = await res.json();

            setProducts(data);
            setLoading(false)
        }
        getDataFormDB();
    }, []);

    const handleDeleteProduct = productId => {

        const isDelete = window.confirm("Are You Sure!");

        if (isDelete) {
            fetch('http://localhost:4000/api/products/' + productId, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err));
            console.log(productId);
        }
    }

    return (
        <div className="container">
            <div className="row">
                {
                    loading ? 'Loading ......' :
                        products.map(product => (<ProductItem
                            key={product._id}
                            product={product}
                            handleDeleteProduct={handleDeleteProduct}
                            handleUpdateProduct={handleUpdateProduct}
                        />
                        ))
                }

            </div>
        </div>
    );
};

export default Products;