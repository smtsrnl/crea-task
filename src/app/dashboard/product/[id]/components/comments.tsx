'use client';
import ProductCommentModel from "@/app/dashboard/ProductCommentModel";
import ProductModel from "@/app/dashboard/ProductModel";
import { calculatedRate, rate as rateFunc } from "@/app/functions";
import axios from "axios";
import moment from "moment";
import { FormEvent, useState } from "react";

interface ProductCommentsParams {
    product: ProductModel
    onRefresh: Function
    comments?: ProductCommentModel[]
}

export default function ProductComments({ product, comments, onRefresh }: ProductCommentsParams) {

    const [insert, setInsert] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [rate, setRate] = useState<number>(1);

    function removeComment(id: number) {
        product.comments?.splice(product.comments?.findIndex((x) => x.id == id), 1)

        axios.put(`/products/${product.id}`, product).then((res) => {
            onRefresh()
        })
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault()

        product.comments?.push({
            name: name,
            rate: rate,
            date: moment().format("mm.dd.yyyy"),
            id: product.comments.length + 1
        })

        axios.put(`/products/${product.id}`, product).then((res) => {
            onRefresh()
            setInsert(false);
            setName('');
            setRate(1);
        })
    }

    return (
        <div className="card mt-5">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div><b>Avg Rate : </b>{calculatedRate(comments)} - {rateFunc(product)}</div>
                    <a href="#" onClick={() => setInsert(true)} className="btn btn-primary">Add New Comment</a>
                </div>
                <hr />
                {
                    insert && (
                        <form action="post" onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-md-1">
                                    <h5 className="text-center">Name</h5>
                                </div>
                                <div className="col-md-4">
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                                </div>
                                <div className="col-md-1">
                                    <h5 className="text-center">Rate</h5>
                                </div>
                                <div className="col-md-4">
                                    <input type="number" className="form-control" max={5} min={1} value={rate} onChange={(e) => setRate(parseInt(e.target.value))} name="rate" />
                                </div>
                                <div className="col-2">
                                    <button className="btn w-100 btn-success" type="submit">Save</button>
                                </div>
                            </div>
                            <hr />
                        </form>
                    )
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments && comments.map((data: ProductCommentModel) => {
                            return (
                                <tr>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>{data.rate}</td>
                                    <td>{data.date}</td>
                                    <td><a href="#" key={data.id} onClick={() => removeComment(data.id)}>Delete</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
