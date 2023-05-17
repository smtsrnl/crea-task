'use client';
import ProductModel from "@/app/dashboard/ProductModel";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

interface DetailParams {
    product: ProductModel
    onRefresh: Function
}

export default function ProductDetail({ product, onRefresh }: DetailParams) {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [currency, setCurrency] = useState<string>('');
    const [image, setImage] = useState<string>("");
    const [saved, setSaved] = useState<boolean>(false);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);


    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        axios.put(`/products/${product.id}`, {
            ...product,
            ...{
                name: name,
                price: price,
                image: image,
                currency: currency,
                description: description,
            }
        }).then((res) => {
            setSaved(true);

            onRefresh();

            setTimeout(() => {
                setSaved(false);
            }, 2000);
        })
    }

    useEffect(() => {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
        setCurrency(product.currency);
        setIsLoaded(true);
    }, [])

    return (
        <div className="card mt-5">
            <div className="card-body">
                <form method="post" onSubmit={handleSubmit}>
                    <h3>Product Detail</h3>
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
                                            <div className="col-md-2">
                                                <img src={image} className="img-fluid" />
                                            </div>
                                            <div className="col-md-10">
                                                <h6>İmage</h6>
                                                <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} name="image" />
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <h6>Name</h6>
                                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h6>Price</h6>
                                                <input type="number" className="form-control" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} name="price" />
                                            </div>
                                            <div className="col-md-4">
                                                <h6>Currency</h6>
                                                <input type="text" className="form-control" value={currency} onChange={(e) => setCurrency(e.target.value)} name="currency" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <h6>Description</h6>
                                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} name="description"></textarea>
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
            </div >
        </div >
    )
}
