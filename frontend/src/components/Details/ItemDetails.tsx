import { Separator, Stack, Text } from '@fluentui/react';
import { IRecipe } from '../../types';
import React from 'react';

const RecipeDetails = ({ recipe }: { recipe: IRecipe }) => {
    return (
        <Stack
            horizontalAlign="center"
            verticalAlign="center"
            styles={{ root: { marginLeft: '5rem' } }}
        >
            <Stack
                styles={{ root: { maxWidth: '800px', width: '100%' } }}
                tokens={{ childrenGap: 10 }}
            >
                <Text variant="xLarge">{recipe.name}</Text>
                <Text><strong>Course:</strong> {recipe.course}</Text>
                <Text><strong>Cook Time:</strong> {recipe.cook_time || -1} minutes</Text>
                <Text><strong>Prep Time:</strong> {recipe.prep_time || -1} minutes</Text>
                <Text><strong>Diet:</strong> {recipe.diet}</Text>
                <Text><strong>Flavor Profile:</strong> {recipe.flavor_profile}</Text>
                <Text><strong>Region:</strong> {recipe.region}</Text>
                <Text><strong>State:</strong> {recipe.state}</Text>
                <Text><strong>Created At:</strong> {new Date(recipe.createdAt).toLocaleString()}</Text>
                <Text><strong>Updated At:</strong> {new Date(recipe.updatedAt).toLocaleString()}</Text>

                <Separator />

                <Text variant="mediumPlus">Ingredients:</Text>
                <ul>
                    {recipe?.ingredients?.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </Stack>
        </Stack>
    );
};

export default React.memo(RecipeDetails)