import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [updatedValueProducts, setUpdatedValueProducts] = useState(false);

  const context = useMemo(() => ({
    updatedValueProducts,
    setUpdatedValueProducts,
  }), [
    updatedValueProducts,
    setUpdatedValueProducts]);
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
