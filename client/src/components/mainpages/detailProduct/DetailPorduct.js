import {useContext,useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {GlobalState} from '../../../GLobalState';



function DetailPorduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.ProductsAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() => {
        if (params.id) {
          products.forEach((product) => {
            if (product._id === params.id) setDetailProduct(product); 
          });
        }
      }, [params.id, products]);


    if(detailProduct.length === 0) return null

  return (
    <>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" className="image" />
        <div className="box-detail">
          <div className="row">
            <h2> {detailProduct.title} </h2>
            <h6>{detailProduct.product_id} </h6>
          </div>
          <span> ${detailProduct.price} </span>
          <p> {detailProduct.description} </p>
          <p> {detailProduct.content} </p>
        </div>
      </div>
    </>
  )
}

export default DetailPorduct