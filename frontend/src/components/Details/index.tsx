import { useEffect, useState } from 'react';
import { fetchDataBasedOnId } from '../../utils/api';
import { DefaultButton } from '@fluentui/react';
import Loader from '../../common/Loader';
import { useHistory, useParams } from 'react-router-dom';
import { IRecipe } from '../../types';
import RecipeDetails from './ItemDetails';

const Details = () => {

    const history = useHistory();
    const [data, setData] = useState<IRecipe>({} as IRecipe);
    const { dishId } = useParams<{ dishId: string }>();
    const [isLoading, setIsLoading] = useState(true);

    const handleClick = () => {
        history.goBack();
    };

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            const response = await fetchDataBasedOnId(dishId);
            setData(response?.data);
            setIsLoading(false)
        }

        fetchDataFromAPI();
    }, [])


    return (
        <div>
            <DefaultButton styles={{ root: { margin: "1rem" } }} onClick={handleClick}>Back</DefaultButton>
            {
                isLoading ?
                    <Loader />
                    :
                    <RecipeDetails recipe={data} />
            }
        </div>
    )

}

export default Details