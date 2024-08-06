import {useContext, useState} from 'react'
import {GlobalState} from '../../../GLobalState';
import axios from 'axios';
import Loading from '../utils/Loading';
import ProductItem from '../utils/productItem/ProductItem';

function Products() {

    const state = useContext(GlobalState)
    const [products] = state.ProductsAPI.products
    const [isAdmin] = state.UserAPI.isAdmin
    const [callback, setCallback] = state.ProductsAPI.callback
    const [loading, setLoading] = useState(false)
    const [token] = state.token

    const deleteProduct = async (id,public_id) =>{
        try {
            setLoading(true)
            await axios.post("/api/destroy",{public_id},
            {
                headers: {Authorization: token}
            }
            )
            await axios.delete(`/api/products/${id}`,{
                headers: {Authorization: token}
            })
            setLoading(false)
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

  return (
    <>
        <div className="products">
            {
                products.map((product)=>{
                    return(
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            deleteProduct={deleteProduct}

                        />
                    )
                })
            }
        </div>

        {products.length === 0 && <Loading/> }
    </>
  )
}

export default Products