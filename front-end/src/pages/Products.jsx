import React from 'react';
import NavBar from '../components/NavBar';
import productsgetAllFetch from '../services/productsFetch';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { value, handleInputChange } = useContext(Context);

  useEffect(() => {
    async function fetchProducts() {
      const response = await productsgetAllFetch();
      const responseData = await response.json();
      setProducts(responseData);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar />
      {products.map((element, index) => (
        <div
          key={ index }
          data-testid={ `customer_products__element-card-title-${index}` }
        >
          <img
            src={ element }
            alt={ element }
            data-testid={ `customer_products__img-card-bg-image-${index}` }
            style={ { width: '200px', height: '150px' } }
          />
          <h3
            data-testid={ `customer_products__element-card-price-${index}` }
          >
            {element.price}

          </h3>
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${index}` }
          >
            +

          </button>
          <input
            value={ value }
            type="number"
            data-testid={ `customer_products__button-card-rm-item-${index}` }
            onChange={ handleInputChange }
          />
          <button
            type="button"
            data-testid={ `customer_products__input-card-quantity-${index}` }
          >
            -

          </button>
        </div>
      ))}

    </div>
  );
}
// fazer fetch dos produtos que estão em produts no provider antes fazer o endpoint no back
