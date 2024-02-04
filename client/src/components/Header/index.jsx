import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { Menu } from 'semantic-ui-react';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const currentPage = useLocation().pathname;
  return (
    <header className="text-light py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link to="/">
            <h1 className="m-2 text-light">Progress Pilot ✈️</h1>
          </Link>
          <p className="m-2">Reshaping your goals.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <Menu inverted>
              <Menu.Item as = {currentPage === '/goals' ? '' : Link} name="My Goals" to="/goals" className={currentPage === '/goals' ? 'menu-active m-2' : 'btn btn-lg btn-dark m-2'}>
                {/* {Auth.getProfile().data.username}'s Goals */}
              </Menu.Item>
              <Menu.Item as = {currentPage === '/squad' ? '' : Link} name="My Squad" to="/squad" className={currentPage === '/squad' ? 'menu-active m-2' : 'btn btn-lg btn-dark m-2'}/>
              <Menu.Item as = {currentPage === '/donate' ? '' : Link} name="Support Us" to="/donate" className={currentPage === '/donate' ? 'menu-active m-2' : 'btn btn-lg btn-dark m-2'}/>
              <button className="btn btn-lg btn-dark m-2 mr-5" onClick={logout}>
                Logout
              </button>
            </Menu>
          ) : (
            <Menu inverted>
              {/* Can remove /donate if authentication required */}
              <Menu.Item as = {currentPage === '/donate' ? '' : Link} name="Support Us" to="/donate" className={currentPage === '/donate' ? 'menu-active m-2' : 'btn btn-lg btn-dark m-2'}/>
              <Menu.Item as = {currentPage === '/login' ? '' : Link} name="Login" to="/login" className={currentPage === '/login' ? 'menu-active m-2' : 'btn btn-lg btn-dark m-2'}/>
              <Menu.Item as = {currentPage === '/signup' ? '' : Link} name = "Sign Up" to="/signup" className={currentPage === '/signup' ? 'menu-active m-2 mr-5' : 'btn btn-lg btn-dark m-2 mr-5'}/>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
