import shopRoutes from './shop';
import bonusRoutes from './bonus';
import customerRoutes from './customer';
import distributionRoutes from './distribution';
import measureRoutes from './measure';
import orderRoutes from './order';
import productRoutes from './product';
import distributorRoutes from './distributor';
import couponRoutes from './coupon';


export default [{
    path: '/nd',
    name: '',
    children: [...shopRoutes,
        ...productRoutes,
        ...orderRoutes,
        ...customerRoutes,
        ...measureRoutes,
        ...distributionRoutes,
        ...bonusRoutes,
        ...distributorRoutes,
        ...couponRoutes
    ]
}
]
