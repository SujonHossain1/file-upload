import './App.css';
import FileUpload from './FileUpload';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import Products from './Products';
import { useState } from 'react';
import Skeleton from './Skelentor';

function App() {
  const history = useHistory();
  const [updateProduct, setUpdateProduct] = useState({});
  const handleUpdateProduct = (product) => {
    setUpdateProduct(product);
  };


  return (
    <Router>
      <h1> <Link to="/"> Add Product </Link> </h1>
      <h1> <Link to="/products"> Products </Link> </h1>
      <Switch>
        <Route exact path='/'>
          {/* <FileUpload
            updateProduct={updateProduct}
            handleUpdateProduct={handleUpdateProduct}
          /> */}
          <Skeleton />
        </Route>
        <Route path='/products'>
          <Products
            handleUpdateProduct={handleUpdateProduct}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
