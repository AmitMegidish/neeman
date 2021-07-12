import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import PostLoginScreen from './screens/PostLoginScreen';
import LoginScreen from './screens/LoginScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import { ProductsScreen } from './screens/ProductsScreen';
import RecentOrdersScreen from './screens/RecentOrdersScreen';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import AddEmployee from './components/AdminUI/AddEmployee';
import recentOrders from './components/AdminUI/RecentOrders';
import PrivateRoutes from './components/PrivateRoutes';


const App = () => {
  return (
    <Router>
      {/* <div className="app"> */}
      <Header />
      <ToastContainer rtl position="bottom-center" />
      <Container className="container">
        <Switch>
          <PrivateRoutes path="/" component={PostLoginScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <PrivateRoutes path="/categories" component={CategoriesScreen} />
          <PrivateRoutes path="/products" component={ProductsScreen} />
          <PrivateRoutes path="/recentOrders" component={RecentOrdersScreen} />
          <PrivateRoutes path="/admin/addEmployee" component={AddEmployee} />
          <Route path="/admin/recentOrders" component={recentOrders} />
        </Switch>
      </Container>
      <Footer />
      {/* </div> */}
    </Router>
  )
}

export default App
