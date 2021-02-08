import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product, handleDeleteProduct, handleUpdateProduct }) => {
    return (
        <div className="col-md-4">
            <div class="card" >
                <img class="card-img-top img-fluid" src={`http://localhost:4000/${product?.image1}`} alt={product?.alt} />
                <div class="card-body">
                    <h5 class="card-title"> {product.title} </h5>
                    <p class="card-text"> {product.description} </p>
                    <button onClick={() => handleDeleteProduct(product._id)} className="btn btn-danger">Delete</button>
                    <button onClick={() => handleUpdateProduct(product)} className="btn btn-primary ms-3">
                        <Link to="/"> Update</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;