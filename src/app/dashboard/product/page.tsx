'use client';
import axios from "axios";
import { FormEvent, useState } from "react";
import moment from "moment";

export default function Detail() {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [saved, setSaved] = useState<boolean>(false);
    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        axios.post("/products", {
            name: name,
            currency: currency,
            description: description,
            price: price,
            image: image,
            date: moment().format("mm.dd.yyyy"),
        }).then((res) => {
            setSaved(true);

            setTimeout(() => {
                setSaved(false);
            }, 2000);
        })
    }

    return (
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
