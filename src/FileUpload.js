import React, { useEffect, useState } from 'react';
import slugify from './Slugify';
import { useForm } from "react-hook-form";

const FileUpload = ({ updateProduct, handleUpdateProduct }) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({
        title: '',
        url: '',
        category: '',
        subCategory: ''
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [getProduct, setGetProduct] = useState({});
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    // useEffect(() => {
    //     setProduct(updateProduct);
    //     console.log(updateProduct);
    // }, [handleUpdateProduct])

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setProduct((product) => ({
            ...product,
            url: slugify(product.title || ' '),
            [name]: value,
        }));
    };


    const imageHandler1 = (e) => {
        const file = e.target.files[0];
        setImage1(file);
    };
    const imageHandler2 = (e) => {
        const file = e.target.files[0];
        setImage2(file);
    }
    const imageHandler3 = (e) => {
        const file = e.target.files[0];
        setImage3(file);
    }
    const imageHandler4 = (e) => {
        const file = e.target.files[0];
        setImage4(file);
    }

    useEffect(() => {
        fetch('http://localhost:4000/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (product.category) {
            fetch(`http://localhost:4000/api/subCategories/${product.category}`)
                .then(res => res.json())
                .then(data => setSubCategories(data.subCategories))
                .catch(err => console.error(err));
        }
    }, [product.category]);


    useEffect(() => {
        fetch('http://localhost:4000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [])



    const onSubmit = (data, event) => {
        event.preventDefault();

        const formData = new FormData();

        if (image1) formData.append('image1', image1);
        if (image2) formData.append('image2', image2);
        if (image3) formData.append('image3', image3);
        if (image2) formData.append('image4', image4)


        for (const key of Object.keys(product)) {
            formData.set(key, product[key]);
            console.log(key, product[key]);
        };

        const { category, subCategory } = data;

        if (category && subCategory) {
            fetch(`http://localhost:4000/api/products/${product.category}/${product.subCategory}/add-product`, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    setGetProduct(data);

                })
                .catch(err => setErrorMsg(err.message));
        }
    }

    console.log(errorMsg);
    console.log(getProduct);


    return (
        <>
            <div className="container">
                {
                    getProduct.data ?
                        getProduct.message &&
                        <div class="alert alert-success" role="alert">
                            <h2> {getProduct.message} </h2>
                        </div>
                        :
                        getProduct.message &&
                        <div class="alert alert-warning" role="alert">
                            <h2> {getProduct.message} </h2>
                        </div>
                }
            </div>
            <form className="col-md-6 mx-auto p-4 shadow-sm bg-light" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Product Category *</label>
                    <select
                        className="form-select"
                        name="category"
                        onChange={inputHandler}
                        ref={register({
                            required: 'Product Category is required'
                        })}
                    >
                        <option value="">Choose Category</option>
                        {categories.map(category => (
                            <option
                                value={category._id}
                                key={category._id}
                            >
                                {category.category}
                            </option>
                        ))}
                    </select>
                    {errors.category && <span style={{ color: 'red' }}>{errors.category.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Product Sub Category *</label>
                    <select
                        className="form-select"
                        name="subCategory"
                        onChange={inputHandler}
                        ref={register({
                            required: 'Product Sub Category is required'
                        })}
                    >
                        <option value="">Choose Sub Category</option>
                        {subCategories?.map(subCat => (
                            <option
                                value={subCat._id}
                                key={subCat._id}
                            >
                                {subCat.subCategory}
                            </option>
                        ))}
                    </select>
                    {errors.subCategory && <span style={{ color: 'red' }}>{errors.subCategory.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Title *</label>
                    <input
                        name="title"
                        onChange={inputHandler}
                        type="text"
                        className="form-control"
                        ref={register({
                            required: 'Product Title is required'
                        })}
                    />
                    {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="shotDescription" className="form-label">Shot Description</label>
                    <textarea
                        onChange={inputHandler}
                        name="shortDescription"
                        className="form-control"
                        id="shotDescription"
                        rows="3">
                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">*Description</label>
                    <textarea
                        onChange={inputHandler}
                        name="description"
                        className="form-control"
                        id="description"
                        ref={register({
                            required: 'Product Description is required'
                        })}
                        rows="5">
                    </textarea>
                    {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">*Stock</label>
                    <input name="stock" onChange={inputHandler} type="number" id="stock" className="form-control" value={product.stock}
                        ref={register({
                            required: "Product Stock is required",
                        })}
                    />
                    {errors.stock && <span style={{ color: 'red' }}>{errors.stock.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="previousPrice" className="form-label">Previous Price</label>
                    <input name="previousPrice" onChange={inputHandler} type="number" className="form-control" id="previousPrice" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">* Price</label>
                    <input name="price" onChange={inputHandler} type="number" className="form-control" id="price" value={product.price}
                        ref={register({
                            required: "Product Price is required",
                        })}
                    />
                    {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Image 1 </label>
                    <input onChange={imageHandler1} accept=".png, .jpeg, .jpg" name="image1" className="form-control" type="file" filename="about.jpg" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Image 2 </label>
                    <input onChange={imageHandler2} accept=".png, .jpeg, .jpg" name="image2" className="form-control" type="file" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Image 3 </label>
                    <input onChange={imageHandler3} accept=".png, .jpeg, .jpg" name="image2" className="form-control" type="file" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Image 4 </label>
                    <input onChange={imageHandler4} accept=".png, .jpeg, .jpg" name="image2" className="form-control" type="file" />
                </div>
                <div className="mb-3">
                    <label htmlFor="productKey" className="form-label">Product Key</label>
                    <input name="productKey" onChange={inputHandler} type="text" id="productKey" className="form-control"
                        ref={register({
                            required: 'Product key is required'
                        })}
                    />
                    {errors.productKey && <span style={{ color: 'red' }}>{errors.productKey.message}</span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="alt" className="form-label">Alt</label>
                    <input name="alt" onChange={inputHandler} type="text" id="alt" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="url" className="form-label">*Url</label>
                    <input name="url" defaultValue={slugify(product.title)} onChange={inputHandler} type="text" id="url" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default FileUpload;