import ProductItem, { ProductItemInterface } from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS: ProductItemInterface[] = [
	{
		id: 'p1',
		price: 6,
		title: 'My First Book',
		description: 'The First Book I ever wrote',
	},
	{
		id: 'p2',
		price: 5,
		title: 'My Second Book',
		description: 'The Second Book I ever wrote',
	},
];

const Products = () => {
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_PRODUCTS.map((product: ProductItemInterface) => (
					<ProductItem
						key={product.id}
						id={product.id}
						title={product.title}
						price={product.price}
						description={product.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
