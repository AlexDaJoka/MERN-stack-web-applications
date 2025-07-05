import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectProductById} from './productsApiSlice'


const Product = ({ productId }) => {

const product = (state => selectProductById(state, productId))


const navigate = useNavigate()

if(product){

    const handleEdit = () => navigate(`/dash/products/${productId}`)

    return (
        <tr className="table__row user">
        <td>{product.productName}</td>
        <td>{product.productPrice}</td>
        <td>{product.productDescription}</td>
        <td>{product.deliver}</td>
        <td>
            <button
                className="icon-button table__button"
                onClick={handleEdit}
            >
                Edit
            </button>
        </td>
    </tr>
    )

}else return null

}
export default Product