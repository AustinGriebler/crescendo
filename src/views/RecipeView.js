import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import styles from './Counter.module.css';
import { useParams } from 'react-router-dom';
import {
    useGetRecipeQuery, useGetSpecialsQuery,
  } from '../app/services/recipes';
import { Grid, Divider, Tooltip, Chip } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const useStyles = makeStyles((theme) => ({
    root: {
     display: "flex",
    },
    subTitle: {
        fontsize: "1.25rem",
        fontWeight: 500,
        marginLeft: "1rem"
    },
    divider: {
        margin: "2rem 0",
        width: "50%"
    },
    list: {
        textAlign: "left"
    },
    listItem: {
        padding: "1rem 0"
    },
    gridItem: {
        marginTop: "2rem"
    },
    img: {
        display: "block",
        maxwidth: "100%"
    }
  }));

export function SpecialsTooltip({special, children}) {
    const SpecialTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
          padding: "1rem"
        },
      }))(Tooltip);

      console.log(special)

      return ( 
        <SpecialTooltip 
            title={
                <React.Fragment>
                    <Typography variant="h6">{special.title}</Typography>
                    <Typography>{special.text}</Typography>
                    <Chip size="small" label={special.type} />
                </React.Fragment>
            } 
        >
            {children}
        </SpecialTooltip>
    );
}


export function RecipeView() {
    let { id } = useParams();
    const { data: recipe, isLoading } = useGetRecipeQuery(id);
    const { data: specials } = useGetSpecialsQuery();
    const classes = useStyles();

    function findSpecial(ingredient) {
        if(!specials) return
        const special = specials.find((special) => ( special.ingredientId === ingredient.uuid))

        if (!special) return
        return (
        <SpecialsTooltip special={special}>
            <InfoOutlinedIcon fontSize="small" />
        </SpecialsTooltip>);
    }
    
    if (isLoading) {
        return <div>Loading</div>;
    }
    
    if (!recipe) {
        return <div>No recipe found :(</div>;
    }

    return (
        <React.Fragment>
            <Container className={classes.root} maxWidth="lg">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img className={classes.img} src={`http://localhost:3001${recipe.images.medium}`} alt={recipe.title} />
                    <Divider className={classes.divider} />
                    <Typography variant="h2" color="textSecondary">{recipe.title}</Typography>
                    <div>
                        <span className={classes.subTitle}>Servings: </span> {recipe.servings}  <span className={classes.subTitle}>Prep Time: </span> {recipe.prepTime} mins <span className={classes.subTitle}>Cook Time:</span> {recipe.cookTime} mins
                    </div>
                    <Grid 
                        item
                        container
                        direction="row"
                    >
                        <Grid item className={classes.gridItem} xs={12} sm={6}>
                            <Typography variant="h4" color="primary">Ingredients</Typography>
                            
                                <ul className={classes.list}>
                                {recipe.ingredients.map((ingredient) => (
                                    <li className={classes.listItem}> {ingredient.amount} {ingredient.measurement} {ingredient.name} {findSpecial(ingredient)}</li>
                                ))}
                                </ul>
                        </Grid>
                        <Grid item className={classes.gridItem} xs={12} sm={6}>
                            <Typography variant="h4" color="primary">Directions</Typography>
                            <ol className={classes.list}>
                            {recipe.directions.map((direction) => (
                                <li className={classes.listItem}>{direction.instructions} 
                                {direction.optional && (
                                    <span>(optional)</span>
                                )}</li>
                            ))}
                            </ol>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
  }