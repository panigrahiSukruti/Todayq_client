import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { products } from '../../assests/marketplace';
import ProductCard from '../../components/productCard';
import FilterPanel from "../../components/filterPanel";
import { Link } from 'react-router-dom';

function Home() {
  // eslint-disable-next-line no-unused-vars
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [card, setCard] = useState([])
  useEffect(() => {
    fetch('https://todayq-backend.onrender.com/api/content-offerings')
    .then(response => response.json())
    .then(data => {
      setCard(data)
    })
  }, [])
  
  // Function to handle filter changes
  const handleFilterChange = (type, value, isChecked) => {
    let updatedProducts = [...products];

    // Filter products based on the selected filters
    if (isChecked) {
      updatedProducts = updatedProducts.filter(product => product[type].includes(value));
    } else {
      updatedProducts = updatedProducts.filter(product => !product[type].includes(value));
    }

    // Update filtered products
    setFilteredProducts(updatedProducts);
  };

  return (
    <Container className="mt-5">
      <Link to="/create-content-offering">addoffering</Link>
      <Row>
        <Col sm={3}>
          {/* Render the filter panel */}
          <FilterPanel handleFilterChange={handleFilterChange} />
        </Col>
        <Col sm={9}>
          {/* Render the filtered products */}
          <Row>
            {card.map((product, index) => (
              <Col key={index} sm={12} md={6} lg={4}>
                {/* Wrap ProductCard in a Link to navigate to ProductDetail */}
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <ProductCard product={product} />
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;