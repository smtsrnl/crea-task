'use client';
import axios from "axios";
import { FormEvent, useState } from "react";
import moment from "moment";

export default function Detail() {
    const [name, setName] = useState<string>("");
    const [star, setStar] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [saved, setSaved] = useState<boolean>(false);
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        axios.post("http://localhost:8000/products/", {
            name: name,
            star: star,
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
            <form method="post" onSubmit={handleSubmit}>
                <h1>Add New Product</h1>
                <hr />
                {
                    saved && (
                        <div className="alert alert-success" role="alert">
                            Your data successful saved
                        </div>
                    )
                }
                <div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <h6>Name</h6>
                            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} name="name" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <h6>Star</h6>
                            <input type="number" className="form-control" onChange={(e) => setStar(parseInt(e.target.value))} name="star" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <h6>Price</h6>
                            <input type="number" className="form-control" onChange={(e) => setPrice(parseInt(e.target.value))} name="price" />
                        </div>
                        <div className="col-md-6 mb-3">
                            <h6>İmage</h6>
                            <input type="text" className="form-control" onChange={(e) => setImage(e.target.value)} name="image" />
                        </div>
                    </div>
                    <hr />
                    <div className="col">
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
