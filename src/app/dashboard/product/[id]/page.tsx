'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../ProductModel";
import ProductDetail from "./components/detail";
import ProductComments from "./components/comments";

interface DetailParams {
    params: {
        id: number
    }
}

export default function Detail({ params }: DetailParams) {
    const [product, setProduct] = useState<Product>();
    const [tab, setTab] = useState<string>("detail");

    function onRefresh() {
        axios.get(`/products/${params.id}`)
            .then((res) => {
                let product: Product = res.data;
                setProduct(product);
            })
    }

    useEffect(() => {
        onRefresh();
    }, [])

    return (
        <div>
            <nav className="nav nav-pills flex-column flex-sm-row">
                <a className={`flex-sm-fill text-sm-center nav-link ${tab == "detail" && 'active'}`} aria-current="page" href="#" onClick={() => setTab("detail")}>Detail</a>
                <a className={`flex-sm-fill text-sm-center nav-link ${tab == "comments" && 'active'}`} href="#" onClick={() => setTab("comments")}>Comments</a>
            </nav>
            {
                tab == "detail" && product && (
                    <ProductDetail product={product} onRefresh={onRefresh} />
                )
            }
            {
                tab == "comments" && product && (
                    <ProductComments product={product} comments={product.comments} onRefresh={onRefresh} />
                )
            }

        </div>
    )
}
