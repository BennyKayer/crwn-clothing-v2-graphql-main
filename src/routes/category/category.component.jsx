import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { gql, useQuery, useMutation } from "@apollo/client";

import { CategoryContainer, Title } from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";

const GET_CATEGORY = gql`
    query GetCollection($title: String) {
        getCollectionsByTitle(title: $title) {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const SET_CATEGORY = gql`
    mutation SetCategory($category: Category!) {
        addCategory(category: $category) {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const Category = () => {
    const { category } = useParams();

    // const { loading, error, data } = useQuery(GET_CATEGORY, {
    //     variables: {
    //         title: category,
    //     },
    // });

    const [addCategory, { loading, error, data }] = useMutation(SET_CATEGORY);
    addCategory({ variables: { category: categoryObject } });

    useEffect(() => {
        if (data) {
            const {
                getCollectionsByTitle: { items },
            } = data;
            setProducts(items);
        }
    }, [category, data]);

    const [products, setProducts] = useState([]);

    return (
        <Fragment>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Title>{category.toUpperCase()}</Title>
                    <CategoryContainer>
                        {products &&
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </CategoryContainer>
                </>
            )}
        </Fragment>
    );
};

export default Category;
