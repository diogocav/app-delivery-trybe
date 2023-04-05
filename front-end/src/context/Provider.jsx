import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [updatedValueProducts, setUpdatedValueProducts] = useState(false);
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
  }, []);

  const context = useMemo(() => ({
    updatedValueProducts,
    setUpdatedValueProducts,
    userInfo,
    setUserInfo,
  }), [
    updatedValueProducts,
    setUpdatedValueProducts,
    userInfo,
    setUserInfo,
  ]);
  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}
Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Provider;
