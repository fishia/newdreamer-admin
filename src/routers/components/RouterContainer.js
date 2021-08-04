import React from 'react';
import renderRoutes from '../utils/renderRoutes';

const RC = ({route,extraProps,switchProps}) => {
	return renderRoutes(route.routes || [], extraProps, switchProps)
}

export default React.memo(RC);
