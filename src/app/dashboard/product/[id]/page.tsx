'use client';
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Product from "../../ProductModel";

interface DetailParams {
    params: {
        id: number
    }
}

export default function Detail({ params }: DetailParams) {
    const [name, setName] = useState<string>("");
    const [star, setStar] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [saved, setSaved] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>();
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        axios.put("http://localhost:8000/products/" + params.id, {
            ...product,
            ...{
                name: name,
                star: star,
                price: price,
                image: image,
            }
        }).then((res) => {
            setSaved(true);

            setTimeout(() => {
                setSaved(false);
            }, 2000);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:8000/products/" + params.id,)
            .then((res) => {
                let product: Product = res.data;
                setProduct(product);
                setIsLoaded(true);
                setName(product.name);
                setStar(product.star);
                setPrice(product.price);
                setImage(product.image);
            })
    }, [])

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <h1>Edit Product</h1>
                <hr />
                {
                    saved && (
                        <div className="alert alert-success" role="alert">
                            Your data successful saved
                        </div>
                    )
                }
                {
                    isLoaded && (
                        <div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row mb-5">
                                        <div className="col-md-2 mx-auto">
                                            <img src={image} className="img-fluid" />
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6>Name</h6>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6>Star</h6>
                                    <input type="number" className="form-control" value={star} onChange={(e) => setStar(parseInt(e.target.value))} name="star" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6>Price</h6>
                                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} name="price" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <h6>İmage</h6>
                                    <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} name="image" />
                                </div>
                            </div>
                            <hr />
                            <div className="col">
                                <button type="submit" className="btn btn-primary w-100">Submit</button>
                            </div>
                        </div>
                    )
                }

                {
                    !isLoaded && (
                        <div className="text-center">
                            Loading . . .
                        </div>
                    )
                }
            </form>
        </div>
    )
}
