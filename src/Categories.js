import { Link } from 'react-router-dom';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SkeletonCategory from './skeletons/SkeletonCategory';
import { HomeIcon } from '@heroicons/react/solid';

const Categories = ({ ref = 'scroller' }) => {
  const history = useHistory();

  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    { categories: [] }
  );

  if (data) {
    console.log(data);
  }

  return (
    <div className="max-w-3xl mx-auto text-center my-2">
      <h3 className="text-lg text-gray-900">Categories</h3>
      <div className="category">
        {isLoading
          ? // <div>Loading ...</div>
            [1, 2, 3, 4, 5].map((n) => (
              <SkeletonCategory Key={n} theme="dark" />
            ))
          : data.categories &&
            data.categories.map((category) => (
              <span className="mx-auto" key={category.idCategory}>
                <Link
                  to={`/CategoryInfo/${category.strCategory}`}
                  className="mx-0.5"
                >
                  <img
                    className="cat-img"
                    src={category.strCategoryThumb}
                    alt={category.strMeal}
                  />
                  <h2 className="categories">{category.strCategory}</h2>
                </Link>
              </span>
            ))}
      </div>
      <Link to="/">
        <button className="home-btn absolute top-1 right-1 sm:top-2 sm:right-4  hover:bg-white  py-2 px-4 bg-gray-900 sm:bg-gray-700">
          <HomeIcon className="home-icon h-5 w-5 text-white  hover:text-black" />
        </button>
      </Link>
    </div>
  );
};
export default Categories;
