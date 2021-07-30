import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    useGetRecipesQuery,
  } from '../app/services/recipes';
import { Grid, Button, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    viewRecipe: {
        textDecoration: "none",
        width: "100%",
        alignItems: "center",
        fontSize: "1.5rem",
        color: "#000",
    }
  }));

const RecipeListItem = ({ data: { title, uuid, images, description, postDate }, onSelect }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardHeader title={title} subheader={`Posted on: ${postDate}`}/>
                <CardMedia className={classes.media} image={`http://localhost:3001${images.full}`} title={title}/>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Button className={classes.viewRecipe} onClick={() => onSelect(uuid)}>View Recipe</Button>
                 </CardActions>
            </Card>
        </React.Fragment>
    );
  };
  
const RecipeList = () => {
    const { data: recipes, isLoading } = useGetRecipesQuery();
    const { push } = useHistory();
  
    if (isLoading) {
      return <div>Loading</div>;
    }
  
    if (!recipes) {
      return <div>No recipes :(</div>;
    }
  
    return (
        <>
            {recipes.map((recipe) => (
                <Grid item xs="12" sm="6" lg="4">
                    <RecipeListItem key={recipe.id} data={recipe} onSelect={(id) => push(`/${id}`)} />
                </Grid>
            ))}
        </>
    );     
  };

export function Recipes() {
  
    return (
    <Container maxWidth="lg">
        <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={3}
        >
            <RecipeList/>
        </Grid>
    </Container>
    );
  }