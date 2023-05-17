'use client';
import Link from 'next/link'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Product from './ProductModel';
import styles from '../page.module.css';
import { rate } from '../functions';

export default function Dashboard() {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/products").then((res) => {
      setLoad(true);
      setData(res.data);
    })
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Star</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {!load && (
          <tr>
            <th colSpan={6}> Loading . . .</th>
          </tr>
        )}
        {load &&
          data.map((data: Product) => {
            return (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <th scope="row"><img src={data.image} className={styles["table-image"]} /></th>
                <td>{data.name}</td>
                <td>{data.price}{data.currency}</td>
                <td>{(rate(data))}</td>
                <td>{data.date}</td>
                <td><Link href={`/dashboard/product/${data.id}`}>Detail</Link></td>
              </tr>
            )
          })
        }

      </tbody>
    </table >
  )
}
